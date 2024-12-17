import { BodyLong, Heading, ReadMore } from "@navikt/ds-react";
import { Tag } from "@navikt/ds-react/Tag";
import { subYears } from "date-fns";
import { IMinsteInntektGrunnlag } from "~/models/getMinsteinntektGrunnlag.server";
import styles from "./inntekt.module.css";
import classNames from "classnames";

interface IProps {
  minsteInntektGrunnlag: IMinsteInntektGrunnlag;
}

export function Inntekt({ minsteInntektGrunnlag }: IProps) {
  const now = new Date();
  const lastYear = subYears(now, 1);
  const lastThreeYears = subYears(now, 3);

  function formattedDate(date: Date) {
    const dateOption: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("no", dateOption);
  }

  return (
    <div className="card">
      <Tag variant="neutral-filled" className={classNames(styles.tag, "tag--pdf")}>
        Hentet fra Skatteetaten
      </Tag>
      <Heading size="medium" level={"2"} spacing>
        Inntekt
      </Heading>
      <BodyLong spacing>
        Inntekt siste 12 måneder fra {formattedDate(lastYear)} til {formattedDate(now)} <br />
        <strong>{minsteInntektGrunnlag.siste12mnd} kroner</strong>
      </BodyLong>
      <BodyLong spacing>
        Inntekt siste 36 måneder fra {formattedDate(lastThreeYears)} til {formattedDate(now)} <br />
        <strong>{minsteInntektGrunnlag.siste36mnd} kroner</strong>.
      </BodyLong>
      <div className={styles.verticalLine} aria-hidden />
      <ReadMore header="Hvilke inntekter gir rett til dagpenger?" className="readmore--pdf">
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
