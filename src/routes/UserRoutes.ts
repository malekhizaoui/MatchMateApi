import { param, body } from 'express-validator';
import { UserController } from '../controller/UserController';


export const userRoutes = [
	{
		method: 'get',
		route: '/users',
		controller: UserController,
		action: 'getAllUsers',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	{
		method: 'get',
		route: '/users/:id',
		controller: UserController,
		action: 'getOneUser',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'put',
		route: '/user/:id',
		controller: UserController,
		action: 'updateUser',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'delete',
		route: '/user/remove/:id',
		controller: UserController,
		action: 'deleteUser',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false

	},
];