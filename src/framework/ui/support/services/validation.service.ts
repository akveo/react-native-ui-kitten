export const isValidString = (source: string | null): boolean => {
  if (source && source.length > 0) {
    return true;
  }
  return false;
};
