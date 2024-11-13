export const createErrorToastObject = (
  message: string = "There was a problem with your request.",
  title: string = "Uh oh! Something went wrong.",
) => ({
  title,
  description: message,
});
