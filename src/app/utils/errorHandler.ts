/**
 * Extracts a user-friendly error message from various error types.
 * @param error - The error object caught in a catch block.
 * @returns A string representing the error message.
 */
export const getErrorMessage = (error: any): string => {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'Um erro desconhecido ocorreu.';
};