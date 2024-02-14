import { param, body } from 'express-validator';
import { StadiumController } from '../controller/StadiumController';
 

export const stadiumdRoutes = [
	// {
	// 	method: 'get',
	// 	route: '/users',
	// 	controller: StadiumController,
	// 	action: 'getAllUsers',
	// 	validation: [],
	// 	includeVerifyToken: false,
	// 	includeVerifyAdmin:false
		
	// },
	// {
	// 	method: 'get',
	// 	route: '/users/:id',
	// 	controller: StadiumController,
	// 	action: 'getOneUser',
	// 	validation: [param('id').isInt()],
	// 	includeVerifyToken: false,
	// 	includeVerifyAdmin:false
	// },
	// {
	// 	method: 'put',
	// 	route: '/users/:id',
	// 	controller: UserController,
	// 	action: 'updateUserByID',
	// 	validation: [param('id').isInt()],
	// 	includeVerifyToken: false,
	// 	includeVerifyAdmin:false
	// },
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
		method: 'post',
		route: '/stadium',
		controller: StadiumController,
		action: 'createStadium',
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