/**
 * Removes extra whitespace from a string
 * - Trims leading and trailing whitespace
 * - Replaces multiple consecutive spaces with a single space
 * - Optionally normalizes newlines and other whitespace characters
 * 
 * @param text - The input string to clean
 * @param options - Optional configuration
 * @param options.preserveNewlines - If true, preserves newlines but collapses multiple newlines to single. Default: false
 * @param options.collapseAllWhitespace - If true, collapses all whitespace types (spaces, tabs, newlines) to single space. Default: true
 * @returns The cleaned string with extra whitespace removed
 * 
 * @example
 * removeExtraWhiteSpace("  hello    world  ") // "hello world"
 * removeExtraWhiteSpace("hello\n\n\nworld") // "hello world" (default)
 * removeExtraWhiteSpace("hello\n\n\nworld", { preserveNewlines: true }) // "hello\nworld"
 */
export const removeExtraWhiteSpace = (
  text: string,
  options: {
    preserveNewlines?: boolean;
    collapseAllWhitespace?: boolean;
  } = {}
): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const {
    preserveNewlines = false,
    collapseAllWhitespace = true,
  } = options;

  let cleaned = text.trim();

  if (collapseAllWhitespace && !preserveNewlines) {
    // Replace all whitespace characters (spaces, tabs, newlines) with single space
    cleaned = cleaned.replace(/\s+/g, ' ');
  } else if (preserveNewlines) {
    // Collapse multiple spaces/tabs to single space, but preserve newlines
    // First, replace multiple spaces/tabs with single space
    cleaned = cleaned.replace(/[ \t]+/g, ' ');
    // Then, collapse multiple newlines to single newline
    cleaned = cleaned.replace(/\n\s*\n+/g, '\n');
  } else {
    // Just collapse multiple spaces to single space
    cleaned = cleaned.replace(/ +/g, ' ');
  }

  return cleaned.trim();
};

/**
 * Simple version that just removes extra spaces (most common use case)
 * Trims and collapses multiple spaces to single space
 * 
 * @param text - The input string to clean
 * @returns The cleaned string
 * 
 * @example
 * removeExtraSpaces("  hello    world  ") // "hello world"
 */
export const removeExtraSpaces = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  return text.trim().replace(/\s+/g, ' ');
};

