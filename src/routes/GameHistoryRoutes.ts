import { param, body } from 'express-validator';
import { GameHistoryController } from '../controller/GameHistory'; 

export const gameHistoryRoutes = [
	{
		method: 'get',
		route: '/gameHistories',
		controller: GameHistoryController,
		action: 'getAllGameHistories',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	{
		method: 'get',
		route: '/field/:id',
		controller: GameHistoryController,
		action: 'getOneField',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'get',
		route: '/gameHistoryUserId/:id',
		controller: GameHistoryController,
		action: 'getAllGameHistoriesbyUserId',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'get',
		route: '/GameHistoryById/:id',
		controller: GameHistoryController,
		action: 'getGameHistoryById',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'put',
		route: '/field/:id',
		controller: GameHistoryController,
		action: 'updateField',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'post',
		route: '/field',
		controller: GameHistoryController,
		action: 'createField',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'delete',
		route: '/field/remove/:id',
		controller: GameHistoryController,
		action: 'deleteFeedback',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false

	},
];