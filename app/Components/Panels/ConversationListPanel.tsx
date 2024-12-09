import React from "react";
import clsx from "clsx";
import { handleNewConversation } from "@/app/services/startNewConversation";
import { Loader2 } from "lucide-react";

interface ConversationListPanelProps {
  onToggleRight: () => void;
  selectedConversation: any;
  setSelectedConversation: any;
  conversations: any;
  setConversations: any;
}

const ConversationListPanel: React.FC<ConversationListPanelProps> = ({
  onToggleRight,
  selectedConversation,
  setSelectedConversation,
  conversations,
  setConversations
}) => {
  
  const startNewConversation = async () => {
    const newConversation = await handleNewConversation();    
    setConversations((prev) => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
  };


  const handleConversationClick = async (conv: any) => {
    setSelectedConversation(conv);
    if(conv.trip_status) {
      onToggleRight();
    }
  };

  if (!conversations.length) {
    return (
      <div className="animate-spin h-[100px] flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="relative p-3">
      <div
        className="absolute top-4 right-3 font-bold text-gray-200 cursor-pointer"
        onClick={onToggleRight}
      >
        X
      </div>
      <button
        onClick={startNewConversation}
        className="font-bold text-2xl mb-3"
      >
        Start New
      </button>
      <ul className="overflow-y-auto max-h-screen">
        {conversations.map((conv: any) => (
          <li
        key={conv.id}
        onClick={() => handleConversationClick(conv)}
        className="mb-1 cursor-pointer"
          >
        <p
          className={clsx("truncate", {
            "bg-grey-500 text-red-500":
          conv.id === selectedConversation?.id,
          })}
        >
          {conv.title || `Conversation ${conv.id}`}
        </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationListPanel;
