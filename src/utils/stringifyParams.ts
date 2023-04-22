export const stringifyParams = (obj: Record<string, string | number | string[]>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const key in obj) {
    result[key] = String(obj[key]);
  }
  return result;
};
