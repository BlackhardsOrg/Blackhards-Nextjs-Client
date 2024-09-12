import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface IRating {
  name: string;
  email: string;
  rating: number;
  comment: string;
  gameTitleId: string;
}
export const sendRating = async (ratingData: IRating): Promise<void> => {
  try {
    await axios.post(`${API_URL}/ratings/create`, ratingData);
    toast.info("Rating submitted successfully");
  } catch (error) {
    console.error("Error submitting rating", error);
    toast.error("Error submitting rating");
  }
};
