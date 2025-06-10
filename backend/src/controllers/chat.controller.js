import { Message } from "../models/message.model.js";

const getMessages = async (req, res, next) => {
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
    await Message.updateMany({ senderId:r_id ,receiverId: myId, delivered: false }, { delivered: true });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};

async function markasDelivered (req, res) {
  try {
    const { id } = req.params;
    const currentUserId = req.auth().userId; // from auth middleware
    console.log("📨 markasDelivered:", { id, currentUserId });
    // Mark messages as delivered
   const updated = await Message.updateMany(
      { 
        senderId: id, 
        receiverId: currentUserId, 
        seen: false 
      },
      { seen: true }
    );
    console.log("🔍 Updated messages:", updated);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getMessages, markasDelivered };
