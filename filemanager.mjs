import process from 'process';

import { displayWorkDir } from './utils.mjs';

const userName = process.argv[2];

console.log(`Welcome to the File Manager, ${userName}!`);
displayWorkDir();

process.stdin.on('data', data => {
    let command = data.toString().trim();
    console.log(command === '.exit')
    switch (command) {
        case '.exit':
            console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
            process.stdin.pause()
        default:
            console.log('Invalid input')
    }
})

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.stdin.pause();
})

process.on('error', ()=>{
    console.log('Operation failed')
})