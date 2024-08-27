import { ChatMessage, Score } from "./interfaces";

const colors = [
    "#c43a2d",
    "#d9bf1a",
    "#4cbd39",
    "#1a8cd9",
    "#d91a8c",
    "#1ad9b1",
    "#ae5dd9",
    "#d9b11a",
]

export const chatTestData1: ChatMessage[] = [
{
    user: "damor",
    message: "this is an older message and can't be seen here",
    color: colors[0]
},
{
    user: "damor",
    message: "Lorem ipsum dolor sit amet.",
    color: colors[0]
},
{
    user: "farms",
    message: "consectetur adipiscing elit. Sed do?",
    color: colors[1]
},
{
    user: "steedie",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    color: colors[6]
},
{
    user: "opnpc",
    message: "Vasa tua destruam",
    color: colors[2]
},
]

export const scoreTestData1: Score[] = [
{
    user: "steedie",
    score: 3,
    color: colors[6],
    isMe: true
},
{
    user: "damor",
    score: 10,
    color: colors[0]
},
{
    user: "jeff",
    score: 10,
    color: colors[3]
},
{
    user: "damor",
    score: 520,
    color: colors[0]
},
{
    user: "hypnoshock",
    score: 1042,
    color: colors[5]
},
{
    user: "farms",
    score: 22,
    color: colors[1]
}

]