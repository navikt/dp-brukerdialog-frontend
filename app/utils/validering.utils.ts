export function requireField(data: any, ctx: any, field: string, message: string) {
  if (!data[field]) {
    ctx.addIssue({
      path: [field],
      code: "custom",
      message,
    });
    return false;
  }

  return true;
}
