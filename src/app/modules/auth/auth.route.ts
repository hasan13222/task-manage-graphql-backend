import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { verifyCookieToken, verifyToken } from '../../middleware/verifyToken';
const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthControllers.signup,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthControllers.login,
);
router.get('/profile', verifyCookieToken(), AuthControllers.getMyProfile)
router.put('/profile', verifyCookieToken(), validateRequest(AuthValidations.updateUserValidationSchema), AuthControllers.updateMyProfile)

router.post('/forgot-password', validateRequest(AuthValidations.forgetPasswordValidationSchema), AuthControllers.forgetPassword)
router.post('/reset-password', verifyToken(), validateRequest(AuthValidations.resetPasswordValidationSchema), AuthControllers.resetPassword)

router.post('/change-password', verifyCookieToken(), validateRequest(AuthValidations.changePasswordValidationSchema), AuthControllers.changePassword)
router.post('/refresh-token', AuthControllers.refreshToken())
router.get('/isLoggedIn', verifyCookieToken(), AuthControllers.checkLogin())
router.post('/logout', AuthControllers.logout())

export const AuthRoutes = router;
