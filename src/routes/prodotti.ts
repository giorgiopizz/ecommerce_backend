import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/prodotti", (req, res) => {
	return res.send("lista prodotti");
});
export default router;
