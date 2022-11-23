// escapeSpecialCharacters.ts

/**
 * Evaluates search input and escapes special characters.
 * @remarks Recommend using function within front end to sanitize the search input before sending to Bloomreach
 * @param {string} input
 * @returns {string}
 */
export function escapeSpecialCharacters (input:string): string {
  // sets search term to lower case
  input = input.toLowerCase();

  return input
    // remove special characters except space, lowercase letters, and numbers
    .replace(/[^a-z0-9 ]/g, '');
};
