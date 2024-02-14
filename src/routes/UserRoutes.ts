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
		route: '/users/:id',
		controller: UserController,
		action: 'updateUserByID',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	// {
	// 	method: 'put',
	// 	route: '/newVisited/:id',
	// 	controller: UserController,
	// 	action: 'monumentVisitedByUser',
	// 	validation: [param('id').isInt()],
	// 	includeVerifyToken: false,
	// 	includeVerifyAdmin:false
	// },
	{
		method: 'put',
		route: '/teamUser',
		controller: UserController,
		action: 'addUserToTeam',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	// {
	// 	method: 'delete',
	// 	route: '/feedback/remove/:id',
	// 	controller: UserController,
	// 	action: 'deleteFeedback',
	// 	validation: [param('id').isInt()],
	// 	includeVerifyToken: false,
	// 	includeVerifyAdmin:false

	// },
];