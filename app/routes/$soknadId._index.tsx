import { BodyLong, Heading } from "@navikt/ds-react";
import { ActionFunctionArgs, data,  LoaderFunctionArgs, MetaFunction, redirect , useLoaderData } from "react-router";
import { validationError } from "@rvf/react-router";
import { withZod } from "@rvf/zod";
import { useRef } from "react";
import invariant from "tiny-invariant";
import { z } from "zod";
import { InntektSkjema } from "~/components/inntekt-skjema/InntektSkjema";
import { Inntekt } from "~/components/inntekt/Inntekt";
import { getMinsteinntektGrunnlag } from "~/models/getMinsteinntektGrunnlag.server";
import { postMinsteinntektForeleggingresultat } from "~/models/postMinsteinntektForeleggingresultat.server";
import { journalforPdf } from "~/models/journalforPdf.server";

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
      inntektStemmer: z.enum([ "true", "false" ], {
        required_error: "Du må svare på dette spørsmålet",
      }),
      begrunnelse: z.string().optional(),
      pdfHtml: z.string(),
    })
    .superRefine((data, ctx) => {
      const { inntektStemmer, begrunnelse } = data;

      if (inntektStemmer === "false" && begrunnelse === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Du må svare på dette spørsmålet",
          path: [ "begrunnelse" ],
        });
      }
    })
);


export default function DinInntektIndex() {
  const { minsteInntektGrunnlag } = useLoaderData<typeof loader>();
  const appRef = useRef<HTMLDivElement>(null);

  if (minsteInntektGrunnlag.status === "error") {
    return "Det skjedde en feil ved henting av inntekt";
  }

  return (
    <div className="brukerdialog" ref={appRef} id="brukerdialog">
      <Heading size="large" level={"1"} id="header-icon">
        Inntekt
      </Heading>

      <BodyLong spacing className="mt-4">
        Vi trenger at du sjekker innteksopplysningene vi har hentet om deg.
      </BodyLong>

      <Inntekt minsteInntektGrunnlag={minsteInntektGrunnlag.data} />
      <InntektSkjema />
    </div>
  );
}
