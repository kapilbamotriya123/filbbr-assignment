import React, { useEffect, useState } from "react";
import {
  Loader2,
  ShareIcon,
} from "lucide-react";
import TripDetails from "../TripDetails";
import ShareModel from "../ShareModel";
import { fetchItinerary } from "@/app/services/ItenaryService";
import Link from "next/link";

interface ItineraryPanelProps {
  onToggleLeft: () => void;
  seletedConversation: any;
}

const ItineraryPanel: React.FC<ItineraryPanelProps> = ({
  onToggleLeft,
  seletedConversation,
}) => {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tripId, setTripId] = useState<string | null>(
    seletedConversation?.trip_id
  );

  console.log(itinerary)


  useEffect(() => {
    const fetchItineraryDetails = async (tripId: string) =>{
      setLoading(true);
      const data = await fetchItinerary(tripId);
      setItinerary(data);
      setLoading(false);
    }
    if (tripId && seletedConversation.trip_status) {
     fetchItineraryDetails(tripId);
    }
  }, [tripId]);

  


  if (!loading && !seletedConversation) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-400">No trip selected</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <div
        className="absolute top-4 right-3 font-bold text-gray-200 cursor-pointer"
        onClick={onToggleLeft}
      >
        X
      </div>

      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin">
            <Loader2 />
          </div>
        </div>
      )}

      {!loading && !itinerary && (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-400">No itinerary found</p>
        </div>
      )}

      {!loading && itinerary && (
        <div>
          <Link href={`/conversations/share/${seletedConversation.trip_id}`}>
          <ShareIcon
            
            className="w-6 h-6 cursor-pointer"
            />
            </Link>

          <TripDetails itinerary={itinerary} />
        </div>
      )}
    </div>
  );
};

export default ItineraryPanel;
