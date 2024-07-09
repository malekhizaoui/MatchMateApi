import { param, body } from 'express-validator';
import { AuthController } from '../controller/AuthController';

export const AuthRoutes = [
	{
		method: 'put',
		route: '/resendCode',
		controller: AuthController,
		action: 'resendCode',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	// {
	// 	method: 'delete',
	// 	route: '/users/:id',
	// 	controller: AuthController,
	// 	action: 'remove',
	// 	validation: [param('id').isInt()],
	// 	includeVerifyToken: false,
	// 	includeVerifyAdmin:false
	// },
	{
		method: 'post',
		route: '/register',
		controller: AuthController,
		action: 'register',
		validation: [
			body('lastName')
				.trim()
				.isString()
				.matches(/^[a-zA-Z]+$/),
			body('firstName')
				.trim()
				.isString()
				.matches(/^[a-zA-Z]+$/),
			body('email')
				.trim()
				.toLowerCase()
				.isEmail()
				.withMessage('Adresse e-mail invalide.'),
			body('password')
				.trim()
				.isLength({ min: 8 })
				.withMessage('Le mot de passe doit comporter au moins 8 caractères.'),
		],
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	{
		method: 'post',
		route: '/login',
		controller: AuthController,
		action: 'connexion',
		includeVerifyToken: false,
		includeVerifyAdmin:false
		
	},
	{
		method: 'put',
		route: '/resetpassword',
		controller: AuthController,
		action: 'resetPassword',
		validation: [],
		includeVerifyToken: false,
		includeVerifyAdmin:false
	
	},
	// {
	// 	method: 'post',
	// 	route: '/user/google',
	// 	controller: AuthController,
	// 	action: 'loginGoogle',
	// 	includeVerifyToken: false,
	// 	includeVerifyAdmin:false
	
	// },
];