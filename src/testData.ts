import { ChatMessage, Score } from "./interfaces";

const loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

const users = [
{
    user: "steedie",
    color: "#ac75eb",
    score: 10,
    isMe: true
},
{
    user: "5p0rt5BEArD",
    color: "#c43a2d",
    score: 124
},
{
    user: "opnpc",
    color: "#d9bf1a",
    score: 740
},
{
    user: "damor",
    color: "#eb9d0c",
    score: 324
},
{
    user: "farms",
    color: "#41de21",
    score: 680
},
{
    user: "hypnoshock",
    color: "#d44c82",
    score: 48
},
{
    user: "JackBurfy",
    color: "#1ad9b1",
    score: 234
},
{
    user: "Sarang",
    color: "#ae5dd9",
    score: 524
},
{
    user: "speedyThing",
    color: "#dbcc3d",
    score: 402
},
{
    user: "td00gg",
    color: "#1ad9d1",
    score: 68
},
{
    user: "TheBigLewDawg",
    color: "#d65720",
    score: 750
},
{
    user: "Jonny",
    color: "#b547d6",
    score: 300
},
{
    user: "locket",
    color: "#d9d91a",
    score: 410
},
{
    user: "Whips",
    color: "#85e32d",
    score: 650
},
]

function getRandomSnippet(text: string, minLength: number, maxLength: number): string {
    const start = Math.floor(Math.random() * (text.length - minLength));
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return text.substring(start, start + length);
  }

export function generateRandomChatMessage(): ChatMessage {
    const user = users[Math.floor(Math.random() * users.length)];
    const randomMessage = getRandomSnippet(loremipsum, 4, 64);
    return {
        user: user.user,
        message: randomMessage,
        color: user.color
    }
}

export const scoreTestData2: Score[] = users;