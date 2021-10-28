import bcrypt from "bcryptjs";
import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

// import Payload from "../types/Payload";
// import Request from "../types/Request";
import User from "../models/User";

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
	"/",
	[
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 }),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(HttpStatusCodes.BAD_REQUEST).json({
					errors: [
						{
							msg: "User already exists",
						},
					],
				});
			}

			// const options: gravatar.Options = {
			// 	s: "200",
			// 	r: "pg",
			// 	d: "mm",
			// };

			// const avatar = gravatar.url(email, options);

			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(password, salt);

			// Build user object based on IUser
			const userFields = {
				email,
				password: hashed,
				// avatar,
			};

			user = new User(userFields);

			await user.save();

			const payload = {
				userId: user.id,
			};

			jwt.sign(
				payload,
				process.env.jwtSecret || "",
				{ expiresIn: process.env.jwtExpiration || 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err);
			res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(
				"Server Error"
			);
		}
	}
);

export default router;
