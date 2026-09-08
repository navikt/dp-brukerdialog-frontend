import parse from "html-react-parser";
import type { ReactNode } from "react";

export function DescriptionRender(description?: ReactNode) {
  return typeof description === "string" ? parse(description, { trim: true }) : description;
}
