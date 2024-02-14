import { param, body } from 'express-validator';
import TeamController from '../controller/TeamController'; 

export const teamRoutes = [
	{
		method: 'get',
		route: '/teams',
		controller: TeamController,
		action: 'getAllTeams',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	{
		method: 'get',
		route: '/fields/:id',
		controller: TeamController,
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
		controller: TeamController,
		action: 'createField',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
    {
		method: 'post',
		route: '/team',
		controller: TeamController,
		action: 'createTeam',
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