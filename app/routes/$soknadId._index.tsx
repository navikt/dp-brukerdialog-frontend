import { BodyLong, Heading } from "@navikt/ds-react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { InntektSkjema } from "~/components/inntekt-skjema/InntektSkjema";
import { Inntekt } from "~/components/inntekt/Inntekt";
import { getMinsteinntektGrunnlag } from "~/models/getMinsteinntektGrunnlag.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Brukerdialog - Din inntekt kvittering" },
    { name: "description", content: "Brukerdialog - Din inntekt kvittering" },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.soknadId, "SøknadId mangler");

  const minsteInntektGrunnlag = await getMinsteinntektGrunnlag(request, params.soknadId);

  return { minsteInntektGrunnlag };
}

export default function DinInntektIndex({}) {
  const { minsteInntektGrunnlag } = useLoaderData<typeof loader>();

  if (minsteInntektGrunnlag.status === "error") {
    return "Det skjedde en feil ved henting av inntekt";
  }

  return (
    <div className="brukerdialog">
      <div className="brukerdialog">
        <Heading size="large" level={"1"} id="header-icon">
          Din inntekt
        </Heading>

        <BodyLong spacing className="mt-4">
          Vi trenger at du sjekker innteksopplysningene vi har hentet om deg.
        </BodyLong>

        <Inntekt minsteInntektGrunnlag={minsteInntektGrunnlag.data} />
        <InntektSkjema />
      </div>
    </div>
  );
}
