import { BodyLong, Heading } from "@navikt/ds-react";
import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { useEffect, useRef } from "react";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { z } from "zod";
import { InntektSkjema } from "~/components/inntekt-skjema/InntektSkjema";
import { Inntekt } from "~/components/inntekt/Inntekt";
import { getMinsteinntektGrunnlag } from "~/models/getMinsteinntektGrunnlag.server";
import { postMinsteinntektForeleggingresultat } from "~/models/postMinsteinntektForeleggingresultat";

const pageTitle = "Brukerdialog - Din inntekt";
export const meta: MetaFunction = () => {
  return [{ title: pageTitle }, { name: "description", content: pageTitle }];
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

  const { inntektStemmer, begrunnelse } = data.data;

  const postForeleggingResponse = await postMinsteinntektForeleggingresultat(
    request,
    params.soknadId,
    inntektStemmer === "true",
    begrunnelse || ""
  );

  if (postForeleggingResponse.status === "success") {
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

  useEffect(() => {
    if (appRef.current) {
      const styling = `body {padding: 4rem; 5rem;} .navds-body-long.navds-typo--spacing { margin-top: 2rem; } .mt-4 { margin-top: 4rem; } .mt-14 { margin-top: 14rem; } .mt-4 { margin-top: 4rem; } .mt-8 { margin-top: 8rem; } .mb-4 { margin-bottom: 4rem; }`;
      const body = appRef.current.innerHTML;
      const css = `<link rel="stylesheet" href="https://cdn.nav.no/aksel/@navikt/ds-css/2.9.0/index.min.css">`;
      const html = `<!DOCTYPE html><html><head><title>${pageTitle}</title>${css}<style>${styling}</style></head><body>${body}</body></html>`;

      console.log(html);
    }
  }, []);

  return (
    <div className="brukerdialog" ref={appRef}>
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
