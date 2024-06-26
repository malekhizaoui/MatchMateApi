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
	{
		method: 'get',
		route: '/timeSlot/:id',
		controller: TimeSlotsController,
		action: 'getOneTimeSlot',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'put',
		route: '/timeSlot/:id',
		controller: TimeSlotsController,
		action: 'updateTimeSlot',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'post',
		route: '/timeSlot',
		controller: TimeSlotsController,
		action: 'createTimeSlot',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
	{
		method: 'delete',
		route: '/timeSlot/remove/:id',
		controller: TimeSlotsController,
		action: 'deleteTimeSlot',
		validation: [param('id').isInt()],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	},
];