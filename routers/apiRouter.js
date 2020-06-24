import express from 'express';
import routes from '../routes';
import { postRegisterView, postAddComment } from '../controllers/videoControllers';

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.postAddComment, postAddComment);

export default apiRouter;
