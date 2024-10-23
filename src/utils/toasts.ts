export const createErrorToastObject = (
  message: string = "There was a problem with your request.",
) => ({
  title: "Uh oh! Something went wrong.",
  description: message,
});
