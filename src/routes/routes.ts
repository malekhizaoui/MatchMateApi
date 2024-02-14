import { AuthRoutes } from './AuthRoutes';
import { userRoutes } from './UserRoutes';
import { fieldRoutes } from './FieldRoutes';
import { stadiumdRoutes } from './StadiumRoutes';
import { teamRoutes } from './TeamRoutes';
import { timeSlotRoutes } from './TimeSlotRoutes';



export const Routes = [
	...AuthRoutes,
	...userRoutes,
	...fieldRoutes,
	...stadiumdRoutes,
	...teamRoutes,
	...timeSlotRoutes
];