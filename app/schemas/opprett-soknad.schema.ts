import * as yup from "yup";

// Form verdier type
export type OpprettSoknadFormValuesType = yup.InferType<typeof opprettSoknadSchema>;

// Yup-skjema for validering
export const opprettSoknadSchema = yup.object().shape({
  checkbox: yup.boolean().oneOf([true], "Du må godta vilkårene").required("Du må godta vilkårene"),
});
