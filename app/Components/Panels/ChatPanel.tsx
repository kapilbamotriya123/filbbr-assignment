import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, token } from "../../lib/constants";
import clsx from "clsx";
import { handleNewConversation } from "@/app/services/startNewConversation";
import { loadConversation } from "@/app/services/conversationService";

interface ChatPanelProps {

  selectedConversationId: string | null;
}

const ChatPanel: React.FC<ChatPanelProps> = ({

  selectedConversationId,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    if (selectedConversationId) {
      loadMessages(selectedConversationId);
    }
  }, [selectedConversationId]);

  const loadMessages = async (id: string) => {
    const data = await loadConversation(id);
    setMessages(data.messages);
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedConversationId) return;
    const response = await axios.post(
      `${BASE_URL}/api/v2/conversations/${selectedConversationId}/messages`,
      { content: input },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = response.data.data;
    const stream_url = data.stream_url;

    console.log(data);
    const newMessage = { role: "user", content: data.content };
    setMessages((prev) => [...prev, newMessage]);
    const updated_stream_url = BASE_URL + stream_url;
    handleStream(updated_stream_url);
    setInput("");
  };

  const handleStream = (url: string) => {
    const es = new EventSource(url);
    setEventSource(es);

    let assistantMessage = "";

    const error_handling = (error: any) => {
      console.error("Failed to process: ", error);
      es.close();
    };

    console.log("this line is read 1 ");
    es.addEventListener("message", (event) => {
      try {
        const parsedData = JSON.parse((event as MessageEvent).data);
        console.log(parsedData);
        if (parsedData.status === "in-progress") {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];

            if (lastMessage && lastMessage.role === "assistant") {
              lastMessage.content = assistantMessage + parsedData.data.text;
            } else {
              newMessages.push({
                role: "assistant",
                content: parsedData.data.text,
              });
            }

            return newMessages;
          });
        }
        assistantMessage += parsedData.data.text;
        console.log(assistantMessage);
      } catch (error) {
        error_handling("Failed to process message" + error);
      }
    });

    console.log("this line is read 2 ");

    es.addEventListener("error", (event) => {
      error_handling("Error from server: " + (event as MessageEvent).data);
    });

    console.log("this line is read 3 ");

    es.addEventListener("complete", (event) => {
      try {
        const parsedData = JSON.parse((event as MessageEvent).data);
        if (parsedData.data.trip_generation_started) {
        es.close();
        } else if (parsedData.data.trip_status === true) {
        es.close();
        }
      } catch (error) {
        error_handling("Failed to process complete" + error);
      }
    });
  };

  return (
    <div className="px-6 py-10 h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, index) => (
          <div
            key={index}
            className={clsx({ "text-red-700": m.role === "user" })}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 text-white bg-black border border-gray-300 p-2"
        />
        <button onClick={sendMessage} className="border border-white p-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
