import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import { sendVerificationCode } from "../services/emailService";
export class AuthController {
  private userRepository = AppDataSource.getRepository(User);
  client = new OAuth2Client(
    "597756036187-100uttcrtbm9mknefminun9350h5shd4.apps.googleusercontent.com"
  );
  CLIENT_ID =
    "597756036187-100uttcrtbm9mknefminun9350h5shd4.apps.googleusercontent.com";

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, age, password } = req.body;
      // Check if the email is already registered
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        console.log("ddddddd");

        return res.send({sucess:false, message: "Email is already registered" });
        
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
        image:
          "https://cdn.vectorstock.com/i/1000v/82/55/anonymous-user-circle-icon-vector-18958255.jpg",
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      // Save the user to the database
      await this.userRepository.save(newUser);
      // Send the verification code to the user's email
      await sendVerificationCode(email, verificationCode, firstName);
      return res
        .status(201)
        .send({sucess:true, message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error during user registration:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async connexion(request: Request, response: Response, next: NextFunction) {
    try {
      const { password } = request.body;
      const email = request.body.email.trim().toLowerCase();

      const findUser = await this.userRepository.findOneBy({ email });
      if (!findUser) {
        return response.json({
          success: false,
          message: "Adresse e-mail nexiste pas!.",
        });
      }

      if (!findUser.is_verified) {
        return response.json({
          success: false,
          message: "Adresse email non vérifiée!",
        });
      }

      const passwordMatch = await bcrypt.compare(password, findUser.password);
      if (!passwordMatch) {
        return response.json({
          success: false,
          message: "Mot de passe incorrect.",
        });
      }

      const token = jwt.sign({ id: findUser.id }, process.env.TOKEN_SECRET);

      return response.json({ findUser, token });
    } catch (error) {
      console.error("Error during user connexion:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
//   async loginGoogle(request: Request, response: Response, next: NextFunction) {
//     const { tokenId } = request.body;
//     try {
//       const user = await this.client.verifyIdToken({
//         idToken: tokenId,
//         audience:
//           "597756036187-100uttcrtbm9mknefminun9350h5shd4.apps.googleusercontent.com",
//       });
//       const { email_verified, email, family_name, given_name, picture } =
//         user.getPayload();
//       let findUser = await this.userRepository.findOneBy({
//         email,
//       });
//       // if (findUser) {
//       // 	const token = jwt.sign({ _id: findUser.id }, process.env.TOKEN_SECRET);
//       // 	response
//       // 		.status(200)
//       // 		.header('auth-token', token)
//       // 		.send({ token, userId: findUser.id.toString() });
//       // } else {
//       // 	let password = Date.now().toString();
//       // 	const findUser = Object.assign(new User(), {
//       // 		email_utilisateur: email,
//       // 		nom_utilisateur: given_name,
//       // 		prenom_utilisateur: family_name,
//       // 		password_utilisateur: password,
//       // 		photo_utilisateur: picture,
//       // 		is_verified: true,
//       // 	});
//       // 	const salt = await bcrypt.genSalt(10);
//       // 	findUser.password_utilisateur = await bcrypt.hash(
//       // 		findUser.password_utilisateur,
//       // 		salt
//       // 	);
//       // 	const token = jwt.sign({ _id: findUser.id }, process.env.TOKEN_SECRET);
//       // 	// response.header('auth-token', token).send({ findUser, token });
//       // 	await this.userRepository.save(findUser);
//       // 	response
//       // 		.status(200)
//       // 		.header('auth-token', token)
//       // 		.send({ token, userId: findUser.id.toString() });
//       // }
//     } catch (err) {
//       Error(err);
//       response.status(500).send(err);
//     }
//   }
  async resendCode(request: Request, response: Response, next: NextFunction) {
    try {
      const email = request.body;
      console.log("email", email.email);

      let findUser = await this.userRepository.findOneBy({
        email: email.email,
      });

      if (!findUser) {
        response.send({
          success: false,
          message: "Veuillez Vous enregistrez à l'application tout d'abord",
        });
      } else {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        findUser.code_verification = verificationCode;

        await sendVerificationCode(
          email.email,
          verificationCode,
          findUser.firstName
        );

        return await this.userRepository.save(findUser);
      }
    } catch (error) {
      Error(error);
      response.status(500).send(error);
    }
  }

  async resetPassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { newPassword, email } = request.body;

      let findUser = await this.userRepository.findOneBy({
        email,
      });

      if (!findUser) {
        response.send({
          success: false,
          message: "pas d'email liée à cet user!",
        });
      } else {
        if (!findUser.is_verified) {
          response.send({
            success: false,
            message: "Veuillez revérifier votre adresse par le code envoyé!",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          findUser.password = await bcrypt.hash(newPassword, salt);
          return this.userRepository.save(findUser);
        }
      }
    } catch (error) {
      Error(error);
      response.status(500).send(error);
    }
  }
}
