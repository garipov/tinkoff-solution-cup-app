export const filterEmptyParams = (obj: Record<string, unknown>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const key in obj) {
    const value = obj[key];
    if (value == null) continue;
    result[key] = String(value);
  }
  return result;
};
