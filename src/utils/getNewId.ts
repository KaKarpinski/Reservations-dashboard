export const getNewId = (lastId: string) => {
  const [prefix, suffix] = lastId.split("-");
  const newNumber = (Number(suffix) + 1).toString().padStart(3, "0");
  return `${prefix}-${newNumber}`;
};