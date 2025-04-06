import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { taskRoutes } from '../modules/task/task.route';
const router = express.Router();

const moduleRouters = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/tasks',
    routes: taskRoutes
  }
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
