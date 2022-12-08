import process from 'process';
import os from 'os';

import { displayWorkDir } from './utils.mjs';

const userName = process.argv[2];
let curUserDir = os.homedir();

console.log(`Welcome to the File Manager, ${userName}!`);
displayWorkDir(curUserDir);

process.stdin.on('data', data => {
    let command = data.toString().trim();    
    switch (command) {
        case '.exit':
            console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
            process.stdin.pause();
            break;
        case 'os --homedir':
            console.log(os.homedir())
            break;
        case 'os --username':
            console.log(os.userInfo().username);
            break;
        case 'os --cpus':
            console.log(os.cpus());
            break;
        case 'os --architecture': 
            console.log(os.arch());
            break;
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