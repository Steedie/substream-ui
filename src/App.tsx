import { chatTestData1, scoreTestData1 } from "./testData";
import { ChatMessage, Score } from "./interfaces";
import "./App.css";
import "./Chat.css";
import "./Leaderboard.css";

// #region [CHAT BOX]
function Msg(props: { user: string; message: string; color: string }) {
  return (
    <div className="chat-message-container">
      <span className="chat-user" style={{ color: props.color }}>
        {props.user}:
      </span>
      <span className="chat-message">{props.message}</span>
    </div>
  );
}

function MsgInput(props: { user: string; message: string; color: string }) {
  return (
    <div className="chat-message-container chat-message-container-prompt">
      <span className="chat-user" style={{ color: props.color }}>
        {props.user}:
      </span>
      <span className="chat-message-prompt">{props.message}</span>
    </div>
  );
}

function OlderMessages(props: { olderMessages: number }) {
  return (
    <div className="older-messages">
      <span className="older-messages-number">
        {props.olderMessages.toLocaleString()}
      </span>
      <span>
        older message
        {props.olderMessages > 1 ? "s" : ""}
      </span>
    </div>
  );
}

function MsgBox(props: { messages: ChatMessage[] }) {
  const olderMessages = props.messages.length > 3;
  const recentMessages = props.messages.slice(-3);

  return (
    <div className="chat-box">
      {olderMessages && (
        <OlderMessages olderMessages={props.messages.length - 3} />
      )}
      {recentMessages.map((message, index) => (
        <Msg
          key={index}
          user={message.user}
          message={message.message}
          color={message.color}
        />
      ))}
      <MsgInput
        key={"chat-prompt"}
        user={"steedie"}
        message={"--press [X] to chat--"}
        color={"#4cbd39"}
      />
    </div>
  );
}
// #endregion

// #region [LEADERBOARD]
function LdrBoard(props: { scores: Score[] }) {
  const sortedScores = props.scores.sort((a, b) => b.score - a.score);
  const topThree = sortedScores.slice(0, 3);
  const isMeInTopThree = topThree.some((score) => score.isMe);
  let leaders;

  if (isMeInTopThree) {
    leaders = sortedScores.slice(0, 4);
  } else {
    const meScore = sortedScores.find((score) => score.isMe);
    if (meScore) {
      leaders = [...topThree, meScore];
    } else {
      leaders = topThree;
    }
  }

  return (
    <div className="leaderboard">
      {leaders.map((leader, index) => (
        <LdrEntry
          key={index}
          user={leader.user}
          score={leader.score}
          color={leader.color}
          position={
            sortedScores.findIndex((score) => score.user === leader.user) + 1
          }
        />
      ))}
    </div>
  );
}

function LdrEntry(props: {
  user: string;
  score: number;
  color: string;
  position: number;
}) {
  const shadowColor = shadeColor(props.color, -25);
  const entryClass =
    props.position === 1
      ? "leaderboard-entry leaderboard-entry-leader"
      : "leaderboard-entry";

  return (
    <div className={entryClass}>
      <span className="leaderboard-user">{props.user}</span>
      <span className="leaderboard-score">{props.score}</span>
      <span
        className="score-circle shadow-circle"
        style={{ backgroundColor: shadowColor }}
      />
      <span className="score-circle" style={{ backgroundColor: props.color }}>
        {props.position}
      </span>
    </div>
  );
}

function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.floor((R * (100 + percent)) / 100);
  G = Math.floor((G * (100 + percent)) / 100);
  B = Math.floor((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR =
    R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  const GG =
    G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  const BB =
    B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}
// #endregion

function App() {
  return (
    <>
      <MsgBox messages={chatTestData1} />
      <LdrBoard scores={scoreTestData1} />
    </>
  );
}

export default App;
