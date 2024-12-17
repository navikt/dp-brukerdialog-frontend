import { BodyLong, Heading } from "@navikt/ds-react";
import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { useRef } from "react";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { z } from "zod";
import { InntektSkjema } from "~/components/inntekt-skjema/InntektSkjema";
import { Inntekt } from "~/components/inntekt/Inntekt";
import { getMinsteinntektGrunnlag } from "~/models/getMinsteinntektGrunnlag.server";
import { postMinsteinntektForeleggingresultat } from "~/models/postMinsteinntektForeleggingresultat.server";

import { journalforPdf } from "~/models/journalforPdf.server";
import { logger } from "~/utils/logger.utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Brukerdialog - Din inntekt" },
    { name: "description", content: "Brukerdialog - Din inntekt" },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.soknadId, "SøknadId mangler");

  const minsteInntektGrunnlag = await getMinsteinntektGrunnlag(request, params.soknadId);

  return { minsteInntektGrunnlag };
}

export const validator = withZod(
  z
    .object({
      inntektStemmer: z.enum(["true", "false"], {
        required_error: "Du må svare på dette spørsmålet",
      }),
      begrunnelse: z.string().optional(),
      vilSendeDokumentasjon: z.enum(["true", "false"]).optional(),
      pdf: z.string(),
    })
    .superRefine((data, ctx) => {
      const { inntektStemmer, begrunnelse, vilSendeDokumentasjon } = data;

      if (inntektStemmer === "false" && begrunnelse === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Du må svare på dette spørsmålet",
          path: ["begrunnelse"],
        });
      }

      if (inntektStemmer === "false" && !vilSendeDokumentasjon) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Du må svare på dette spørsmålet",
          path: ["vilSendeDokumentasjon"],
        });
      }
    })
);

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.soknadId, "SøknadId mangler");

  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { inntektStemmer, begrunnelse, pdf } = data.data;

  const postForeleggingResponse = await postMinsteinntektForeleggingresultat(
    request,
    params.soknadId,
    inntektStemmer === "true",
    begrunnelse || ""
  );

  const pdfResponse = await journalforPdf(request, params.soknadId, pdf);

  if (postForeleggingResponse.status === "success" && pdfResponse.status === "success") {
    return redirect(`/${params.soknadId}/kvittering`);
  }

  return typedjson({ postForeleggingResponse });
};

export default function DinInntektIndex() {
  const { minsteInntektGrunnlag } = useLoaderData<typeof loader>();
  const appRef = useRef<HTMLDivElement>(null);

  if (minsteInntektGrunnlag.status === "error") {
    return "Det skjedde en feil ved henting av inntekt";
  }

  return (
    <div className="brukerdialog" ref={appRef} id="brukerdialog">
      <Heading size="large" level={"1"} id="header-icon">
        Din inntekt
      </Heading>

      <BodyLong spacing className="mt-4">
        Vi trenger at du sjekker innteksopplysningene vi har hentet om deg.
      </BodyLong>

      <Inntekt minsteInntektGrunnlag={minsteInntektGrunnlag.data} />
      <InntektSkjema />
    </div>
  );
}
