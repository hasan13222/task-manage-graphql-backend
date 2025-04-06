import mongoose from "mongoose";
import { TErrorSources } from "../interface/error.interface";

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorSources => {
  const errorMessages: TErrorSources = Object.values(err.errors).map((item) => {
    return {
      path: item?.path,
      message: item?.message,
    };
  });

  return errorMessages;
};

export default handleValidationError;
