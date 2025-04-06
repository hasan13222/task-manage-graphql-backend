import { AuthServices } from "./auth.services";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  const data = Object.assign(result);
  delete data.password;

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: "User registered successfully",
    data: data,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.changeUserPasswordIntoDB(req.body);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Password changed successfully",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.sendLinkToEmail(req.body);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Lint set to your email to change password",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const useremail = req.user.email as string;
  const result = await AuthServices.setForgottenPasswordIntoDB(
    useremail,
    req.body
  );
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Password changed successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginAuth(req.body);
  const { token, user, refreshToken } = result;
  res.cookie("token", token, {
    secure: config.node_env === "Production",
    httpOnly: true,
    sameSite: config.node_env === "Production" ? "none": "lax",
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "Production",
    httpOnly: true,
    sameSite: config.node_env === "Production" ? "none": "lax",
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "User Logged In successfully",
    data: { user, token, refreshToken },
  });
});

const getMyProfile = (req: Request, res: Response) => {
  // console.log(req.user)
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Profile Information Retrieved Successfully",
    data: req.user.user,
  });
};

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.updateMyProfileIntoDb(
    req.user.user._id,
    req.body
  );
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Profile Updated successfully",
    data: result,
  });
});

const logout = () => (req: Request, res: Response) => {
  res.clearCookie("token", {
    secure: config.node_env === "Production",
    httpOnly: true,
    sameSite: config.node_env === "Production" ? "none": "lax",
  });
  res.clearCookie("refreshToken", {
    secure: config.node_env === "Production",
    httpOnly: true,
    sameSite: config.node_env === "Production" ? "none": "lax",
  });
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "User Logged out successfully",
    data: {},
  });
};

const checkLogin = () => (req: Request, res: Response) => {
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "User is Logged In",
    data: req.user,
  });
};

const refreshToken = () => (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const decoded = jwt.verify(
    refreshToken as string,
    config.refresh_token_secret as string
  ) as JwtPayload;

  if (!decoded) {
    sendResponse(res, {
      status: StatusCodes.FORBIDDEN,
      message: "Accress token has been sent successfully",
      data: null,
    });
  }
  const { email, role } = decoded as JwtPayload;
  const jwtPayload = {
    role,
    email,
  };

  const token = jwt.sign(jwtPayload, config.access_token_secret as string, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    secure: config.node_env === "Production",
    httpOnly: true,
    sameSite: config.node_env === "Production" ? "none": "lax",
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, {
    status: StatusCodes.OK,
    message: "Acceess token has been sent successfully",
    data: { token },
  });
};

export const AuthControllers = {
  signup,
  login,
  logout,
  changePassword,
  forgetPassword,
  resetPassword,
  refreshToken,
  getMyProfile,
  updateMyProfile,
  checkLogin,
};
