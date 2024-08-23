import { chatTestData1 } from "./testData";
import "./App.css";

function ChatMessage(props: { user: string; message: string; color: string }) {
  return (
    <div className="chat-message-container">
      <span className="chat-user" style={{ color: props.color }}>
        {props.user}:
      </span>
      <span className="chat-message">{props.message}</span>
    </div>
  );
}

function ChatPrompt(props: { user: string; message: string; color: string }) {
  return (
    <div className="chat-message-container chat-message-container-prompt">
      <span className="chat-user" style={{ color: props.color }}>
        {props.user}:
      </span>
      <span className="chat-message-prompt">{props.message}</span>
    </div>
  );
}

function ChatBox() {
  return (
    <div className="chat-box">
      {chatTestData1.map((message, index) => (
        <ChatMessage
          key={index}
          user={message.user}
          message={message.message}
          color={message.color}
        />
      ))}
      <ChatPrompt
        key={"chat-prompt"}
        user={"Steedie"}
        message={"--press [X] to chat--"}
        color={"#4cbd39"}
      />
    </div>
  );
}

function App() {
  return (
    <>
      <ChatBox />
    </>
  );
}

export default App;
