import { Message } from "../models/message.model.js";

export const getMessages = async (req, res, next) => {
	try {
		console.log("get messages");
		const myId = req.auth().userId;
		const { r_id } = req.params;
		 console.log("📨 getMessages:", { myId, r_id });

		const messages = await Message.find({
			$or: [
				{ senderId: r_id, receiverId: myId },
				{ senderId: myId, receiverId: r_id },
			],
		}).sort({ createdAt: 1 });
		console.log("🔍 Found messages:", messages.length);

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};
