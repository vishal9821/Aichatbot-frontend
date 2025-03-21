import { useState, useEffect, useRef } from "react";
import './App.css';
import Emojipicker from "emoji-picker-react";
import axios from "axios";



function GetTime(){
    var hr = new Date().getHours()
    var min = new Date().getMinutes()
    if(min===0){
       var time = hr+":"+min+"0"
      }else if(min<10){
          time = hr+":0"+min
         }else{
         time = hr+":"+min
      }
      return time;
 }

function App() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! I'm King of Ai Bots, How can I help you today?", sender: "bot", time: GetTime() },
  ]);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSendMessage = async () => {
    if (!text.trim()) return;

    const userMessage = {
      text: text,
      sender: "user",
      time: GetTime(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setText("");

    try {
      const response = await axios.post("https://aichatbot-backend-bi96.onrender.com/bot", { message: userMessage.text });

      const botMessage = {
        text:  response.data,
        sender: "bot",
        time: GetTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching bot reply:", error);
      const errorMessage = {
        text: "Sorry, something went wrong. Please try again later.",
        sender: "bot",
        time: GetTime(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chatscontainer">
      <div className="top">
        <div className="user">
          <img src="https://i.pinimg.com/736x/5b/ef/a4/5befa46f7565c0776dcaa837ffa0865d.jpg" alt="Bot Avatar" />
          <div className="text">
            <span>LUFFY AI</span>
            <p>How can I assist you today?</p>
          </div>
        </div>
        <div className="icons">
          <img src="https://img.icons8.com/?size=100&id=8uCZVwo2lPVM&format=png&color=000000" alt="info icon" />
          <div className="about">
              I’m Luffy AI, the King of AI Bots! I’m powered by the cutting-edge LLM model GorQ and crafted using LangGraph. My smarts come from some of the most advanced technologies in natural language processing, making me your ultimate conversational companion. Oh, and here’s a fun fact: I’m a stateless bot! That means I don’t record or remember anything you share with me—your queries are as safe as One Piece in the Grand Line. So feel free to ask anything without a worry!

              Proudly built and designed by Vishal, I’m here to make your day smarter, funnier, and more informative. Want to see more cool creations? Visit his website using the link in the footer!

               Let’s set sail on this AI adventure together! 🏴‍☠️
              </div>
        </div>
      </div>
      <div className="middle">
        {messages.map((msg, index) => (
          <div className={`message ${msg.sender === "user" ? "own" : ""}`} key={index}>
            <div className="text">
               <p>{msg.text.split("\n").map((line, idx) => (
                          <p key={idx}>{line}</p>
               ))}</p>
            <span>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottum">
        <div className="message">
          <input
            type="text"
            placeholder="Type a message...."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>
            <img src="https://img.icons8.com/?size=100&id=0prg0S64vdOO&format=png&color=000000" alt="Send" />
          </button>
        </div>
        <div className="emoji">
          <img src="https://img.icons8.com/?size=100&id=GYuFNlTpnzV0&format=png&color=000000" alt="Emoji" onClick={() => setOpen((prev) => !prev)} />
          {open && (
            <div className="picker">
              <Emojipicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
