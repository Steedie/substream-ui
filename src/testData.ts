import { ChatMessage, Score } from "./interfaces";

export const chatTestData1: ChatMessage[] = [
{
    user: "damor",
    message: "this is an older message and can't be seen here",
    color: "#c43a2d"
},
{
    user: "damor",
    message: "Lorem ipsum dolor sit amet.",
    color: "#c43a2d"
},
{
    user: "SpeedyThing",
    message: "consectetur adipiscing elit. Sed do?",
    color: "#d9bf1a"
},
{
    user: "steedie",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    color: "#4cbd39"
},
]

export const scoreTestData1: Score[] = [
{
    user: "steedie",
    score: 42,
    color: "#4cbd39",
    isMe: true
},
{
    user: "damor",
    score: 1,
    color: "#c43a2d"
},
{
    user: "td00g",
    score: 8,
    color: "#d9bf1a"
},
{
    user: "hypnoshock",
    score: 12,
    color: "#1a8cd9"
},
{
    user: "farms",
    score: 4,
    color: "#d91a8c"
}

]