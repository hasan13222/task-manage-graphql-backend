import { ZodError } from "zod";
import { TErrorSources } from "../interface/error.interface";

const handleZodError = (error: ZodError): TErrorSources => {
  const errorMessages: TErrorSources = error.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return errorMessages;
};

export default handleZodError;
