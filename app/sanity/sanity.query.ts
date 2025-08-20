const infosideFields = `{
  textId,
  body
}`;

const infosiderGroq = `* [_type=="brukerdialogInfoside" && language==$baseLang]{
  ...coalesce(* [textId==^.textId && language==$lang][0]${infosideFields}, ${infosideFields})
  }`;

export const allTextsQuery = `{
  "infosider": ${infosiderGroq}
}`;
