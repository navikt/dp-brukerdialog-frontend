/**
 * Grunnleggende spørsmålstype for et svar-objekt S
 * key: navnet på feltet i svar-objektet
 * showIf: funksjon for betinget visning
 */
export type BaseSporsmal<S> = {
  key: keyof S;
  label: string;
  description?: string;
  visHvis?: (svar: S) => boolean;
};

export type RadioSporsmal<S> = BaseSporsmal<S> & {
  type: "radio";
  options: { value: string; label: string }[];
};

export type TextareaSporsmal<S> = BaseSporsmal<S> & {
  type: "textarea";
  maxLength?: number;
};

export type DatepickerSporsmal<S> = BaseSporsmal<S> & {
  type: "datepicker";
};

export type Sporsmal<S> = RadioSporsmal<S> | TextareaSporsmal<S> | DatepickerSporsmal<S>;
