import { BodyLong, Heading, ReadMore } from "@navikt/ds-react";
import { Tag } from "@navikt/ds-react/Tag";
import styles from "./inntekt.module.css";

export function Inntekt() {
  return (
    <div className="card">
      <Tag variant="neutral-filled" className={styles.tag}>
        Hentet fra Skatteetaten
      </Tag>
      <Heading size="medium" level={"2"} spacing>
        Inntekt
      </Heading>
      <BodyLong spacing>
        Inntekt siste 12 måneder fra 1.januar 2023 til 1.januar 2024 <br />
        <strong>112 972 kroner</strong>
      </BodyLong>
      <BodyLong spacing>
        Inntekt siste 12 måneder fra 1.januar 2023 til 1.januar 2024 <br />
        <strong>112 972 kroner</strong>.
      </BodyLong>
      <div className={styles.verticalLine} aria-hidden />
      <ReadMore header="Hvilke inntekter gir rett til dagpenger?">
        <p>
          Vi bruker <strong>disse inntektene</strong> for å finne ut om du har rett til dagpenger:
        </p>
        <ul>
          <li>Arbeidsinntekt</li>
          <li>Foreldrepenger som arbeidstaker</li>
          <li>Svangerskapspenger som arbeidstaker</li>
          <li>Svangerskapsrelaterte sykepenger som arbeidstaker</li>
        </ul>
        <p>
          <strong>Inntekt som selvstendig næringsdrivende</strong> regnes ikke som arbeidsinntekt.
        </p>
        <p>
          Vi har hentet arbeidsinntekten din fra Skatteetaten de siste 12 månedene og 36 månedene.
          NAV velger det alternativet som er best for deg når vi vurderer om du har rett til
          dagpenger.
        </p>
      </ReadMore>
    </div>
  );
}
