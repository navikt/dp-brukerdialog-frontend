import type { ButtonProps } from "@navikt/ds-react";
import { Button, Link } from "@navikt/ds-react";
import type { LinkProps } from "react-router";
import type { PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";

interface IProps extends LinkProps {
  asButtonVariant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  loading?: boolean;
  onClick?: () => void;
}

export const ExternalLink = forwardRef(ExternalLinkComponent);

function ExternalLinkComponent(
  props: PropsWithChildren<IProps>,
  ref: Ref<HTMLAnchorElement> | undefined
) {
  const { asButtonVariant, children, className, loading, size, to } = props;
  const href = to.toString();

  if (asButtonVariant) {
    return (
      <Button
        className={className || ""}
        href={href}
        size={size}
        variant={asButtonVariant}
        loading={loading}
        ref={ref}
        as="a"
      >
        {children}
      </Button>
    );
  }

  return (
    <Link href={href} ref={ref} className={className || ""}>
      {children}
    </Link>
  );
}
