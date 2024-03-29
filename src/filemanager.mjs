import process, { chdir } from 'process';


import { cd_util, ls_util, up_util } from './fs_utils.mjs';
import { add_file_util, cat_util, copy_util, delete_util, move_util, rename_util } from './file_utils.mjs';
import { hash_util } from './hash_utils.mjs';
import { compressFile, decompressFile } from './compress_utils.mjs';
import { eosArch, eosCPUS, eosEOL, eosHomedir, eosUsername } from './eos_utils.mjs';
import { enterMessage, finalMessage } from './enter_util.mjs';

let curUserDir = os.homedir();
process.chdir(curUserDir);

enterMessage(curUserDir);

console.log(os.cpus)

process.stdin.on('data', data => {
    let commandLine = data.toString().trim().split(' ');
    let command = commandLine[0];

    switch (command) {
        case '.exit':
            finalMessage();
            break;
        // OS Section
        case 'os':
            switch (commandLine[1]) {
                case '--homedir': eosHomedir(); break;
                case '--username': eosUsername(); break;
                case '--cpus': eosCPUS(); break;
                case '--architecture': eosArch(); break;
                case '--EOL': eosEOL(); break;
                default: console.log('Invalid input');
            };
            console.log(`You are currently in ${curUserDir}`)
            break;

        //FS Section  
        case 'cd':
            if (!commandLine[1]) { console.log('Invalid input (command need path)') } else { curUserDir = cd_util(curUserDir, commandLine[1]) }; break;
        case 'up':
            curUserDir = up_util(curUserDir); break;
        case 'ls':
            ls_util(curUserDir); break;
        //FILES section
        case 'cat':
            if (!commandLine[1]) { console.log('Error: file should be named') } else { cat_util(`${curUserDir}\\${commandLine[1]}`); }; break;
        case 'add':
            if (!commandLine[1]) { console.log('Error: file should be named') } else { add_file_util(`${curUserDir}/${commandLine[1]}`, curUserDir); }; break;
        case 'rm':
            delete_util(curUserDir, commandLine[1]); break;
        case 'rn':
            if (!commandLine[1] || !commandLine[2]) { console.log('command pattern is rn path_to_file new_filename') } else rename_util(curUserDir, commandLine[1], commandLine[2]); break;
        case 'cp':
            if (!commandLine[1] || !commandLine[2]) { console.log('Error: command pattern is cp path_to_file path_to_new_directory') } else { copy_util(curUserDir, commandLine[1], commandLine[2]); } break;
        case 'mv':
            if (!commandLine[1] || !commandLine[2]) { console.log('Error: command pattern is mv path_to_file path_to_new_directory') } else { move_util(curUserDir, commandLine[1], commandLine[2]); } break;
        //HASH 
        case 'hash':
            if (!commandLine[1]) { console.log('Error: file should be named') } else hash_util(curUserDir, commandLine[1]); break;
        //COMPRESS SECTION
        case 'compress':
            if (!commandLine[1] || !commandLine[2]) { console.log('Error: command pattern is compress path_to_file path_to_destination') } else { compressFile(curUserDir, commandLine[1], commandLine[2]); }; break;
        case 'decompress':
            if (!commandLine[1] || !commandLine[2]) { console.log('Error: command pattern is compress path_to_file path_to_destination') } else decompressFile(curUserDir, commandLine[1], commandLine[2]); break;
        //DEFAULT        
        default:
            console.log('Invalid input');
    };
})

process.on('SIGINT', () => {
    finalMessage();
})

process.on('error', () => {
    console.log('Operation failed')
})