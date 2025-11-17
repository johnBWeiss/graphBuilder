export const generateRandomId = () =>
  Math.random().toString(36).substring(2, 9);

export const deepCloneObject = <T>(obj: T): T =>
  JSON.parse(JSON.stringify(obj));
