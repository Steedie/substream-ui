import { useState, useEffect, useMemo } from "react";
import {
  scoreTestData2,
  generateRandomChatMessage,
  updateRandomUserScore,
} from "./testData";
import { ChatMessage, Score } from "./interfaces";
import "./App.css";
import "./Chat.css";
import "./Leaderboard.css";
import "./Energy.css";

// #region [CHAT BOX]
function Msg(props: {
  user: string;
  message: string;
  color: string;
  classNames?: string;
}) {
  const msgClass =
    "chat-message-container" + (props.classNames ? " " + props.classNames : "");
  return (
    <div className={msgClass}>
      <span className="chat-user" style={{ color: props.color }}>
        {props.user}:
      </span>
      <span className="chat-message">{props.message}</span>
    </div>
  );
}

function MsgInput(props: {
  user: string;
  message: string;
  color: string;
  typing?: boolean;
}) {
  const containerClass = props.typing
    ? "chat-message-container chat-message-container-prompt chat-message-container-glow"
    : "chat-message-container chat-message-container-prompt";
  return (
    <div className={containerClass}>
      <span className="chat-user" style={{ color: props.color }}>
        {props.user}:
      </span>
      {props.typing ? (
        <span className="chat-message-prompt">
          <input
            type="text"
            className="chat-input"
            placeholder="type here..."
          />
        </span>
      ) : (
        <span className="chat-message-prompt">{props.message}</span>
      )}
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
  const showMsgCount = 10;
  const olderMessages = props.messages.length >= showMsgCount;
  const recentMessages = props.messages.slice(-showMsgCount).reverse();

  return (
    <div className="chat-box">
      <div className="chat-inner-box">
        {recentMessages.map((message, index) => (
          <Msg
            key={index + "-" + props.messages.length}
            user={message.user}
            message={message.message}
            color={message.color}
            classNames={
              index === 0
                ? "fade-slide-in"
                : index === recentMessages.length - 1 &&
                  index + 1 === showMsgCount
                ? "slide-out"
                : "slide-in"
            }
          />
        ))}
        {olderMessages && (
          <OlderMessages
            olderMessages={props.messages.length - (showMsgCount - 1)}
          />
        )}
      </div>

      <MsgInput
        key={"chat-prompt"}
        user={"steedie"}
        message={"press [t] to type"}
        color={"#ac75eb"}
        typing={false}
      />
    </div>
  );
}

// #endregion

// #region [LEADERBOARD]
function LdrBoard(props: { scores: Score[] }) {
  const sortedScores = props.scores.sort((a, b) => b.score - a.score);

  const topThree = sortedScores.slice(0, 3);
  const isMeInTop = topThree.some((score) => score.isMe);

  // Iterate over all scores to determine the animation class
  sortedScores.forEach((score, index) => {
    if (score.lastPosition === undefined || score.lastPosition === null) {
      score.lastPosition = -1;
    }

    if (index > score.lastPosition && index < 4) {
      score.animClass = "swap-to-up";
    } else if (index < score.lastPosition && index < 4) {
      if (score.isMe === true && index == 3) {
        score.animClass = "";
      } else {
        score.animClass =
          index == (isMeInTop ? 3 : 2) ? "swap-to-left" : "swap-to-down";
      }
    } else {
      score.animClass = "";
    }

    // Update lastPosition to current index
    score.lastPosition = index;
  });

  let leaders: Score[];
  let meScoreIndex = -1;

  if (isMeInTop) {
    leaders = sortedScores.slice(0, 4);
  } else {
    const meScore = sortedScores.find((score, index) => {
      if (score.isMe) {
        meScoreIndex = index;
        return true;
      }
      return false;
    });
    if (meScore) {
      leaders = [...topThree, meScore];
    } else {
      leaders = topThree;
    }
  }

  const scoresBetween = meScoreIndex > 3 ? meScoreIndex - 3 : 0;

  return (
    <div className="leaderboard">
      {leaders.map((leader, index) => (
        <LdrEntry
          key={index + "-" + leader.user + "-" + leader.score}
          userScore={leader}
          position={
            sortedScores.findIndex((score) => score.user === leader.user) + 1
          }
          scoresBetween={!isMeInTop && index === 3 ? scoresBetween : 0}
        />
      ))}
    </div>
  );
}

function LeaderboardGap({ count }: { count: number | undefined }) {
  const defaultCount = 0;
  return (
    <div className="leaderboard-gap">
      {Array.from({ length: count || defaultCount }, (_, i) => (
        <svg
          key={i}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="5"
            cy="5"
            r="4"
            fill="#00000080"
            stroke="rgb(92, 144, 255)"
            strokeWidth={1}
          />
        </svg>
      ))}
    </div>
  );
}

function LdrEntry(props: {
  userScore: Score;
  position: number;
  scoresBetween?: number;
}) {
  const shadowColor = shadeColor(props.userScore.color, -25);
  let entryClass =
    props.position === 1
      ? "leaderboard-entry leaderboard-entry-leader"
      : "leaderboard-entry";

  entryClass += ` ${props.userScore.animClass}`;

  const classN = "leaderboard-entry-row " + (props.position - 1).toString();

  return (
    <>
      <LeaderboardGap count={props.scoresBetween} />
      <div className={classN}>
        <div className={entryClass}>
          <span className="leaderboard-user">{props.userScore.user}</span>
          <span className="leaderboard-score">{props.userScore.score}</span>
          <span
            className="score-circle shadow-circle"
            style={{ backgroundColor: shadowColor }}
          />
          <span
            className="score-circle"
            style={{ backgroundColor: props.userScore.color }}
          >
            {props.position}
          </span>
        </div>
      </div>
    </>
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

// #region [ENERGY]

function Energy(props: { energy: number }) {
  const bubbles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, index) => {
      const size = Math.random() * 8 + 4;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 3 + 4;

      return (
        <div
          key={index}
          className="energy-bubble"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDuration: `${duration}s`,
          }}
        ></div>
      );
    });
  }, []);

  return (
    <div className="energy-bar">
      <div className="energy-fill" style={{ width: `${props.energy}%` }}>
        <div className="energy-reflection"></div>
        {bubbles}
      </div>
    </div>
  );
}

// #endregion

function App() {
  const [energyLevel, setEnergyLevel] = useState(100);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // GENERATE RANDOM CHAT MESSAGES
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomMessage = generateRandomChatMessage();
      setChatMessages((prevMessages) => [...prevMessages, randomMessage]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // RANDOM ENERGY LEVEL
  useEffect(() => {
    const intervalId = setInterval(() => {
      setEnergyLevel(Math.random() * 100);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  // RANDOM LEADERBOARD SCORES
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRandomUserScore("");
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <MsgBox messages={chatMessages} />
      <LdrBoard scores={scoreTestData2} />
      <Energy energy={energyLevel} />
    </>
  );
}

export default App;
