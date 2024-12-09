import axios from "axios";
import { BASE_URL, token } from "../lib/constants";
export const handleNewConversation = async (content?: string) => {
    const body = content ? { title: "", content } : { title: "" };
    const response = await axios.post(`${BASE_URL}/api/conversations/`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; 
  };

