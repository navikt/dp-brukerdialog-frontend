import * as yup from "yup";
import { opprettSoknadSchema } from "~/schemas/opprett-soknad.schema";

// Utility to traverse a Yup schema and output a Mermaid graph
// Verktøy for å traversere et Yup-skjema og generere en Mermaid-graf
export function yupSchemaToMermaid(name: string, schema: yup.AnyObjectSchema) {
  let nodes: any = [];
  let edges: any = [];

  function traverse(s: any, parent: string) {
    if (s.fields) {
      Object.entries(s.fields).forEach(([key, value]) => {
        const nodeId = `${parent}_${key}`;
        nodes.push(`${nodeId}[${key}: ${(value as yup.AnySchema).type}]`);
        edges.push(`${parent} --> ${nodeId}`);
        traverse(value, nodeId);
      });
    }
  }

  nodes.push(`${name}[${name}]`);
  traverse(schema, name);
  return `graph TD\n${nodes.join("\n")}\n${edges.join("\n")}`;
}

// Example usage:
console.log(yupSchemaToMermaid("opprettSoknadSchema", opprettSoknadSchema));
