import { Message } from "../models/message.model.js";

export const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { r_id } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: r_id, receiverId: myId },
				{ senderId: myId, receiverId: r_id },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};
