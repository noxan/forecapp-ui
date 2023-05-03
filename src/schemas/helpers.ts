import { ZodError } from "zod";
export const extractValidationStatus = (
  validationResult:
    | { success: true; data: any }
    | { success: false; error: ZodError }
) => {
  // extract success and error from validationResult
  if (validationResult.success) {
    return { valid: true, error: "" };
  } else {
    // extract the first error message from the ZodError object
    const errorMsg = validationResult.error.issues[0].message;
    return { valid: false, error: errorMsg };
  }
};
