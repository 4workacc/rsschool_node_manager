import process from 'process';
import os from 'os';
import * as fs from 'fs';

import { displayWorkDir } from './utils.mjs';
import { clear } from 'console';

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
        // OS Section
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
        case 'os --EOL':
            console.log(os.EOL);
            break;
        //FS Section
        case 'ls':
            let dirs = fs.readdirSync(curUserDir);
            let dispDirs = [];
            dirs.map((obj) => {
                let isDirectory = fs.lstatSync(`${curUserDir}/${obj}`).isDirectory();
                dispDirs.push({
                    "name": obj,
                    "type": isDirectory ? 'file' : 'directory'
                });
            })

            dispDirs.sort((a, b) => (a.type > b.type) ? 1 : -1)

            console.table(
                dispDirs.map(obj => {
                    return {
                        'name': obj.name,
                        'type': obj.type
                    }
                })
            );
            break;
        default:
            console.log('Invalid input')
    }
})

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.stdin.pause();
})

process.on('error', () => {
    console.log('Operation failed')
})