import { Heading } from "@navikt/ds-react";
import { HeaderIcon } from "./HeaderIcon";
import styles from "./SoknadHeader.module.css";

export function SoknadHeader() {
  return (
    <div className={styles.soknadHeader}>
      <div className={styles.headerContent}>
        <div className={styles.icon}>
          <HeaderIcon />
        </div>
        <Heading size="xlarge" level={"1"} id="header-icon">
          Søknad behandles
        </Heading>
      </div>
    </div>
  );
}
