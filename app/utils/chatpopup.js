import { useState, useEffect, useRef } from "react";

const ChatPopup = ({ nic, setShowBotPopUp }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const chatContainerRef = useRef(null); // Reference to the chat container to scroll to the bottom
  const popupRef = useRef(null); // Reference for detecting clicks outside the popup

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return; // Prevent sending empty messages
  
    setIsWaitingForResponse(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage },
    ]);
  
    setUserMessage('');
    setLoading(true);
  
    try {
      setTimeout(async () => {
        const response = await fetch('http://localhost:8080/mother/aiMotherDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ question: userMessage, nic: nic }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        const answerArray = JSON.parse(data.answer);
        let formattedAnswer = answerArray[0];
  
        // Clean up the response text
        formattedAnswer = formattedAnswer
          .replace(/\*/g, '') // Remove asterisks
          .replace(/\\n/g, '\n'); // Replace escaped newlines with actual newlines
  
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: formattedAnswer },
        ]);
      }, 2000);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setIsWaitingForResponse(false);
    }
  };
  

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowBotPopUp(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowBotPopUp]);

  // Scroll to the bottom when new messages are added or loading state changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div
        ref={popupRef}
        className="bg-white light:bg-gray-800 p-6 rounded-lg z-10 h-5/6 w-5/6 flex flex-col overflow-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-black light:text-white text-lg font-semibold">AI Chat</h3>
          <button
            className="text-black light:text-white bg-transparent hover:text-gray-600 light:hover:text-gray-400"
            onClick={() => setShowBotPopUp(false)}
          >
            ✖
          </button>
        </div>

        {/* Messages Display */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-auto mb-4"
          style={{ maxHeight: 'calc(80vh - 200px)' }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
            >
              {msg.sender === "bot" && (
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="/bot.png"
                    alt="Bot"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="bg-gray-200 light:bg-gray-600 text-gray-800 light:text-gray-200 p-2 rounded-md">
                    {msg.text}
                  </div>
                </div>
              )}
              {msg.sender === "user" && (
                <div className="bg-blue-500 text-white p-2 rounded-md inline-block">
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center justify-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="flex items-center gap-2 mt-auto">
          {isWaitingForResponse ? (
            <input
              type="text"
              disabled
              className="bg-gray-100 light:bg-gray-700 text-gray-400 w-full p-2 rounded-md"
              value="Waiting for AI response..."
            />
          ) : (
            <input
              type="text"
              className="bg-gray-100 light:bg-gray-700 text-gray-800 light:text-gray-200 w-full p-2 rounded-md"
              value={userMessage}
              onChange={handleInputChange}
              placeholder="Ask a question..."
            />
          )}

          <button
            onClick={handleSendMessage}
            disabled={isWaitingForResponse}
            className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
