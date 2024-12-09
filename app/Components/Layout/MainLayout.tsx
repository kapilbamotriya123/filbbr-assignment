"use client";

import React, { useEffect, useState } from "react";
import ConversationListPanel from "../Panels/ConversationListPanel";
import ChatPanel from "../Panels/ChatPanel";
import ItineraryPanel from "../Panels/ItenaryPanel";
import { BikeIcon, MessageCircle } from "lucide-react";
import { fetchConversations } from "@/app/services/conversationService";

const MainLayout = () => {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(false);

  const [selectedConversation, setselectedConversation] = useState<
    string | null
  >(null);
  const [conversations, setConversations] = useState([]);

  const handleToggleLeft = () => {
    setShowLeft(true);
    setShowRight(false);
  };

  const handleToggleRight = () => {
    if (selectedConversation.trip_status) {
      setShowRight(true);
    }
    setShowLeft(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchConversations();
      const newConversations = data.conversations.filter(
        (conv: any) => conv.trip_status
      );
      setConversations(data.conversations);
      setselectedConversation(data.conversations[0]);
    };
    fetchData();
  }, []);

  console.log(selectedConversation);

  return (
    <div className="flex h-screen overflow-hidden">
      {showLeft ? (
        <div className="w-72 border-r border-gray-300">
          <ConversationListPanel
            onToggleRight={handleToggleRight}
            selectedConversation={selectedConversation}
            setSelectedConversation={setselectedConversation}
            conversations={conversations}
            setConversations={setConversations}
          />
        </div>
      ) : (
        <div
          className="absolute cursor-pointer top-3 left-3 text-gray-200"
          onClick={handleToggleLeft}
        >
          {<MessageCircle />}
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <ChatPanel selectedConversationId={selectedConversation?.id} />
      </div>

      {showRight ? (
        <div className="w-72 border-l border-gray-300">
          <ItineraryPanel
            onToggleLeft={handleToggleLeft}
            seletedConversation={selectedConversation}
          />
        </div>
      ) : (
        selectedConversation?.trip_status && (
          <div
            className="absolute cursor-pointer top-3 right-3 text-gray-200"
            onClick={handleToggleRight}
          >
            {<BikeIcon />}
          </div>
        )
      )}
    </div>
  );
};

export default MainLayout;
