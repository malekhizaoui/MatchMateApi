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
	{
		method: 'put',
		route: '/stadium/:id',
		controller: StadiumController,
		action: 'updateStadium',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'post',
		route: '/stadium',
		controller: StadiumController,
		action: 'createStadium',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'delete',
		route: '/stadium/remove/:id',
		controller: StadiumController,
		action: 'deleteStadium',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false

	},
];