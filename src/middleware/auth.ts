import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

// import Payload from "../types/Payload";
// import Request from "../types/Request";

export default function (req: Request, res: Response, next: NextFunction) {
	// Get token from header
	const token = req.header("x-auth-token");
	let payload;
	// Check if no token
	if (!token) {
		return res
			.status(HttpStatusCodes.UNAUTHORIZED)
			.json({ msg: "No token, authorization denied" });
	}
	// Verify token
	try {
		payload = jwt.verify(token, process.env.jwtSecret || "ciaoajidoa");
		res.locals.jwtPayload = payload;
		next();
	} catch (err) {
		res.status(HttpStatusCodes.UNAUTHORIZED).json({
			msg: "Token is not valid",
		});
	}
	// const {userId} = payload;
	// const newToken = jwt.sign({userId}, process.env.jwtSecret, {expiresIn: process.env.})
}
