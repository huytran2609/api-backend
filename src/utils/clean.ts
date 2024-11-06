export const cleanWhiteSpace = (input: string) => {
  // Sample string with newlines and multiple white spaces

  // Remove newlines and replace multiple white spaces with a single space
  const cleanText = input.replace(/[\n\s]+/g, ' ').trim();
  return cleanText;
};
