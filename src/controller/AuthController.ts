import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import {sendVerificationCode}  from "../services/emailService"
export class AuthController {
  private userRepository = AppDataSource.getRepository(User);
                          
  async register(req: Request, res: Response, next: NextFunction) {
    
    try {
      const { firstName, lastName, email, age, password } = req.body;
      // Check if the email is already registered
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      // Generate a verification code 
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      // Create a new user entity
      const newUser: User = this.userRepository.create({
        firstName,
        lastName,
        email,
        password,
        age,
        code_verification: verificationCode,
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      // Save the user to the database
      await this.userRepository.save(newUser);
      // Send the verification code to the user's email
      await sendVerificationCode(email, verificationCode, firstName);
      return res.status(201).send({ message: 'User registered successfully' ,user:newUser});
    } catch (error) {
      console.error('Error during user registration:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}


  

  async connexion(request: Request, response: Response, next: NextFunction) {
	
		try {
			const { password } = request.body;
			const email = request.body.email
				.trim()
				.toLowerCase();

			let findUser = await this.userRepository.findOneBy({ email });
			if (!findUser) {
				response.send({
					success: false,
					message: 'Adresse e-mail nexiste pas!.',
				});
			} else {
				if (!findUser.is_verified) {
					response.send({
						success: false,
						message: 'Adresse email non vérifiée!',
					});
				} else {
					const password_utilisateur = await bcrypt.compare(
						password,
						findUser.password
					);
					if (!password_utilisateur) {
						response.send({
							success: false,
							message: 'Mot de passe incorrect.',
						});
					} else {
						const token = jwt.sign(
							{ id: findUser.id },
							process.env.TOKEN_SECRET
						);

						response.header('auth-token', token).send({ findUser, token });
					}
				}
			}
		} catch (error) {
			Error(error);
			response.status(500).send(error);
			console.log("error",error);
			
		}
	}

}
