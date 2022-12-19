import { displayWorkDir } from "./utils.mjs";

export const enterMessage = (curUserDir) => {
    const userName = process.platform === 'win32' ? process.argv[3] : process.argv[2];

    console.log(`Welcome to the File Manager, ${userName}!`);
    displayWorkDir(curUserDir);
}

export const finalMessage = () => {
    const userName = process.platform === 'win32' ? process.argv[3] : process.argv[2];

    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.stdin.pause();
}