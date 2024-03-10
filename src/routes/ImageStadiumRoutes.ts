import { param, body } from 'express-validator';

import { ImageStadiumController } from '../controller/ImageStadiumController';

export const imageStadiumRoutes = [
	{
		method: 'get',
		route: '/imagesStadium',
		controller: ImageStadiumController,
		action: 'getAllImagesStadium',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	{
		method: 'get',
		route: '/imageStadium/:id',
		controller: ImageStadiumController,
		action: 'getOneImageStadium',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'put',
		route: '/imageStadium/:id',
		controller: ImageStadiumController,
		action: 'updateImageStadium',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'post',
		route: '/imageStadium',
		controller: ImageStadiumController,
		action: 'createImageStadium',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'delete',
		route: '/imageStadium/remove/:id',
		controller: ImageStadiumController,
		action: 'deleteImageStadium',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false

	},
];