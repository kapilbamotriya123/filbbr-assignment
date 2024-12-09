import axios from "axios";
import { BASE_URL, token } from "../lib/constants";

export const fetchConversations = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/conversations/?skip=0&limit=100`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
    
  };

  export const loadConversation = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/api/conversations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  };
  
