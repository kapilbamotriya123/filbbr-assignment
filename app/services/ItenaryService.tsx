import axios from "axios";
import { BASE_URL, token } from "../lib/constants";

export const fetchItinerary = async (id: string) => {
    
    const response = await axios.get(`${BASE_URL}/api/trip/itinerary/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  };


    export const shareTrip = async (share_id: string) => {
      const response = await axios.get(`${BASE_URL}/api/trip/itinerary/share/${share_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    //   const shareableLink = response.data.data.share_link;
      // Handle sharing logic
    };


