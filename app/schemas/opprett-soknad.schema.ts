import * as Yup from "yup";

// Form verdier type
export type OpprettSoknadFormValuesType = Yup.InferType<typeof opprettSoknadSchema>;

// Yup-skjema for validering
export const opprettSoknadSchema = Yup.object().shape({
  checkbox: Yup.boolean().oneOf([true], "Du må godta vilkårene").required("Du må godta vilkårene"),
});
