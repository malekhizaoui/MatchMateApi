import { param, body } from 'express-validator';
import { FieldController } from '../controller/FieldController';
 

export const fieldRoutes = [
	{
		method: 'get',
		route: '/fields',
		controller: FieldController,
		action: 'getAllFields',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	{
		method: 'get',
		route: '/fields/:id',
		controller: FieldController,
		action: 'getOneField',
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
		route: '/field',
		controller: FieldController,
		action: 'createField',
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