export type ErrorWithMessageType = {
  isInstanceOfError: boolean;
  message: string;
};

export const isErrorWithMessage = (
  error: any
): error is ErrorWithMessageType => {
  return (error as ErrorWithMessageType).isInstanceOfError !== undefined;
};

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Unknown error occured";
}
