import mongoose, { Schema } from "mongoose";

interface IProdotto {
	title: string;
	description: string;
}

const schema = new Schema<IProdotto>({
	title: { type: String, required: true },
	description: { type: String, required: true },
});

const Prodotto = mongoose.model<IProdotto>("Prodotto", schema);

export { Prodotto };
