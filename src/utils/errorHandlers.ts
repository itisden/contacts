import { AxiosError } from "axios";
import { createErrorToastObject } from "@/utils/toasts";
import { toast } from "@/hooks/use-toast";

interface ApiError {
  message: string;
}

interface ValidationApiError {
  errors: Array<{ type: string; msg: string }>;
}

export const genericErrorHandler = (error: unknown) => {
  // Check if it's an Axios error
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError | ValidationApiError;

    // Type guard for ApiError
    if ("message" in data) {
      return toast(createErrorToastObject(data.message, error.message));
    }

    // Type guard for ValidationApiError
    if ("errors" in data) {
      const messages = data.errors.map((err) => err.msg).join(". ");
      return toast(createErrorToastObject(messages, error.message));
    }
  }

  // Handle regular Error
  if (error instanceof Error) {
    return toast(createErrorToastObject(error.message));
  }

  // Fallback for unknown error types
  return toast(createErrorToastObject());
};
