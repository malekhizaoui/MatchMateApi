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
                          
  async register(req: Request, res: Response, next: NextFunction) {
    console.log("sdmlkzdmlknazmdlk");
    try {
      const { firstName, lastName, email, age, password } = req.body;

      // Check if the email is already registered
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      // Generate a verification code (you can use any logic to generate a code)
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
      await this.sendVerificationCode(email, verificationCode, firstName);
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  private async sendVerificationCode(email: string, code: number, firstName: string) {
    // Implement your email sending logic here
    // You can use nodemailer, emailjs, or any other email sending library
    const templateParams = {
      from_name: 'Dourbia Team',
      to_name: `${firstName}`,
      destinataire: `${email}`,
      message: "Veuillez retourner à l'application Dourbia pour introduire le code suivant :",
      code: `${code}`,
      message2: 'Ce code est valable 10 minutes.',
    };

    await emailjs
      .send('service_g5umsa8', 'template_ljhp0cq', templateParams, {
        publicKey: '2yo733rwBPBD-EE_o',
        privateKey: 'dxptoS4-0S5jCb4sxDQVG',
      })
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          console.log('FAILED...', err);
        }
      );
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
				if (findUser.is_verified) {
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
		}
	}
  
}
