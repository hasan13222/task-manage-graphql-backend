import mongoose from "mongoose";
import { TErrorSources } from "../interface/error.interface";

const handleCastError = (err: mongoose.Error.CastError): TErrorSources => {
  return [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
};

export default handleCastError;
