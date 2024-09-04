import { ChatMessage, Score } from "./interfaces";

const loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

const users = [
    {
        user: "steedie",
        color: "#ac75eb",
        score: 0,
        isMe: true
    },
    {
        user: "5p0rt5BEArD",
        color: "#c43a2d",
        score: 0
    },
    {
        user: "opnpc",
        color: "#d9bf1a",
        score: 0
    },
    {
        user: "damor",
        color: "#eb9d0c",
        score: 0
    },
    {
        user: "farms",
        color: "#41de21",
        score: 0
    },
    {
        user: "hypnoshock",
        color: "#d44c82",
        score: 0
    },
    {
        user: "JackBurfy",
        color: "#1ad9b1",
        score: 0
    },
    {
        user: "Sarang",
        color: "#ae5dd9",
        score: 0
    },
    {
        user: "speedyThing",
        color: "#dbcc3d",
        score: 0
    },
    {
        user: "td00gg",
        color: "#1ad9d1",
        score: 0
    },
    {
        user: "TheBigLewDawg",
        color: "#d65720",
        score: 0
    },
    {
        user: "Jonny",
        color: "#b547d6",
        score: 0
    },
    {
        user: "locket",
        color: "#d9d91a",
        score: 0
    },
    {
        user: "Whips",
        color: "#85e32d",
        score: 0
    },
]

export function updateUserScores(bias: string | null): void {
    users.forEach((user)=> {
        const action = Math.floor(Math.random() * 4);

        if (action === 1) {
            user.score += user.user === bias ? 2 : 1;
        } 
    })
}

export function updateRandomUserScore(bias: string | null): void {
    // get random user
    const user = users[Math.floor(Math.random() * users.length)];
    user.score += user.user === bias ? 2 : 1;
}

function getRandomSnippet(text: string, minLength: number, maxLength: number): string {
    const start = Math.floor(Math.random() * (text.length - minLength));
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return text.substring(start, start + length);
  }

export function generateRandomChatMessage(): ChatMessage {
    const user = users[Math.floor(Math.random() * users.length)];
    const randomMessage = getRandomSnippet(loremipsum, 2, 32);
    return {
        user: user.user,
        message: randomMessage,
        color: user.color
    }
}

export const scoreTestData2: Score[] = users;