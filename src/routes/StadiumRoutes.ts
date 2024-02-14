import { param, body } from 'express-validator';
import { StadiumController } from '../controller/StadiumController';
 

export const stadiumdRoutes = [
	{
		method: 'get',
		route: '/stadiums',
		controller: StadiumController,
		action: 'getAllStadiums',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	{
		method: 'get',
		route: '/stadium/:id',
		controller: StadiumController,
		action: 'getOneStadium',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
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