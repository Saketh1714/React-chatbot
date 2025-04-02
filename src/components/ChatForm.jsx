import React, { use } from "react";
import { useRef, useState } from "react";
const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) {
      setIsSubmitting(false);
      return;
    }
    inputRef.current.value = "";
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => {
        const updatedHistory = [
          ...history,
          { role: "model", text: "Thinking saketh..." },
        ];

        // Call generateBotResponse AFTER updating chat history
        generateBotResponse(updatedHistory);
        setIsSubmitting(false);

        return updatedHistory;
      });
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="material-symbols-rounded"
      >
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
