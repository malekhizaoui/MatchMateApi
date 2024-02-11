import { Express, Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Routes } from './routes/routes';
// import  verifyTokenMiddleware  from './middleware/verifToken'; 
// import verifAdmin from "./middleware/verifAdmin"


export const configureRoutes = (app: Express) => {
  Routes.forEach((route) => {
    const routeMiddleware = [
      ...(route.validation || []),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
          }

        
						// if (route.includeVerifyToken === true) {
						// 	await verifyTokenMiddleware(req, res);
						// }

						// if (route.includeVerifyAdmin === true) {
						// 	await verifAdmin(req, res, next); // Add the 'next' parameter here
						// }

          const result = await new (route.controller as any)()[route.action](req, res, next);
          res.json(result);
        } catch (error) {
          next(error);
        }
      },
    ];

    const { method } = route;

    (app as any)[method]
    (`/api/v1${route.route}`,
     ...routeMiddleware);
  });
};