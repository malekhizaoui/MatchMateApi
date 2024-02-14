import { param, body } from 'express-validator';
import { TimeSlotsController } from '../controller/TimeSlotController'; 

export const timeSlotRoutes = [
	{
		method: 'get',
		route: '/timeSlots',
		controller: TimeSlotsController,
		action: 'getAllTimeSlots',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	// {
	// 	method: 'get',
	// 	route: '/stadium/:id',
	// 	controller: TimeSlotsController,
	// 	action: 'getOneStadium',
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
		route: '/timeSlot',
		controller: TimeSlotsController,
		action: 'createTimeSlot',
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