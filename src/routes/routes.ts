import { AuthRoutes } from './AuthRoutes';
import { userRoutes } from './UserRoutes';
import { fieldRoutes } from './FieldRoutes';
import { stadiumdRoutes } from './StadiumRoutes';
import { timeSlotRoutes } from './TimeSlotRoutes';
import { gameHistoryRoutes } from './GameHistoryRoutes';
import { imageStadiumRoutes } from './ImageStadiumRoutes';

export const Routes = [
	...AuthRoutes,
	...userRoutes,
	...fieldRoutes,
	...stadiumdRoutes,
	...timeSlotRoutes,
	...gameHistoryRoutes,
	...imageStadiumRoutes
];