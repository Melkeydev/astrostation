export const cls = (input: any) =>
  input
    .replace(/\s+/gm, " ")
    .split(" ")
    .filter((cond: string) => typeof cond === "string")
    .join(" ")
    .trim();
