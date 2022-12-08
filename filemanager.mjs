import process, { chdir } from 'process';
console.log('cs')
import os from 'os';
import * as fs from 'fs';

import { displayWorkDir } from './utils.mjs';
import { clear } from 'console';

const userName = process.argv[2];
let curUserDir = os.homedir();
process.chdir(curUserDir);

console.log(`Welcome to the File Manager, ${userName}!`);
displayWorkDir(curUserDir);

process.stdin.on('data', data => {
    let commandLine = data.toString().trim().split(' ');
    let command = commandLine[0];

    switch (command) {
        case '.exit':
            console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
            process.stdin.pause();
            break;
        // OS Section
        case 'os':
            switch (commandLine[1]) {
                case '--homedir':
                    console.log(os.homedir())
                    break;
                case '--username':
                    console.log(os.userInfo().username);
                    break;
                case '--cpus':
                    console.log(os.cpus());
                    break;
                case '--architecture':
                    console.log(os.arch());
                    break;
                case '--EOL':
                    console.log(os.EOL);
                    break;
                default:
                    console.log('Invalid input');
            };
            break;

        //FS Section  
        case 'cd':
            if ( !commandLine[1]) {
                console.log('Invalid input (command need path)')
            } 
            else {
                let newPath = `${curUserDir}/${commandLine[1]}`;
                if ( !fs.existsSync( newPath )) {
                    console.log('Target path dont exists')
                }
                else {
                    curUserDir = `${curUserDir}/${commandLine[1]}`;
                    console.log(`You are currently in ${curUserDir}`)
                }
            }
            break;     
        case 'up':
            console.debug(curUserDir)
            if ( curUserDir === 'C:' || curUserDir === '/home') {
                console.log('Error: could not move higher');
            }
            else {                
                curUserDir = curUserDir.split('/');             
                curUserDir.pop();            
                curUserDir = curUserDir.join('/');
                console.log(`You are currently in ${curUserDir}`)
            }
            break;
        case 'ls':
            let dirs = fs.readdirSync(curUserDir);
            let dispDirs = [];
            dirs.map((obj) => {
                let isDirectory = fs.lstatSync(`${curUserDir}/${obj}`).isDirectory();
                dispDirs.push({
                    "name": obj,
                    "type": isDirectory ?   'directory' :'file'
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
        //DEFAULT
        default:
            console.log('Invalid input');

    };
})

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.stdin.pause();
})

process.on('error', () => {
    console.log('Operation failed')
})