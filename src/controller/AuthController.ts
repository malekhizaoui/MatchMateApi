import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import nodemailer, { createTransport } from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import emailjs from '@emailjs/nodejs';

export class AuthController {
	private userRepository = AppDataSource.getRepository(User);


}