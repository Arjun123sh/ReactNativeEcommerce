import Razorpay from "razorpay";
import { constants } from "../constants.js";

const instance = new Razorpay({
	key_id: constants.KEY_ID,
	key_secret: constants.RAZORPAY_SECRET,
});

export default instance;