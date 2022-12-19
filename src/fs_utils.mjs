import * as fs from 'fs';
import os from 'os';

export const cd_util = (curUserDir, commandArg) => {   
    let newPath = `${curUserDir}\\${commandArg}`
    if ( commandArg.indexOf(os.homedir()) != -1) {
        newPath = commandArg ;
    }    
    fs.readdir(`${newPath}`, (err)=>{
        if (err) { console.log('Error: path dont exists')} else {           
            console.log(`You are currently in ${newPath}`)
        }
    })    
    return newPath;
}

export const up_util = (curUserDir) => {
    if (curUserDir === os.homedir()) {
        console.log('Error: could not move higher');
    }
    else {
        curUserDir = curUserDir.split('\\');
        curUserDir.pop();
        curUserDir = curUserDir.join('\\');
        console.log(`You are currently in ${curUserDir}`)
    }
    return curUserDir;
}

export const ls_util = (curUserDir) => {
    fs.readdir(curUserDir, (err, dirs) => {
        if (err) { console.log('Error: ls command error') } else {
            let dispDirs = [];
            for (let i = 0; i < dirs.length; i++) {
                fs.lstat(`${curUserDir}\\${dirs[i]}`, (err, stats) => {
                    dispDirs.push({
                        "name": dirs[i],
                        "type": stats.isDirectory() ? 'directory' : 'file'
                    });
                    if ( i === dirs.length -1 ) {
                        dispDirs.sort((a, b) => (a.type > b.type) ? 1 : -1);
                        console.table(
                            dispDirs.map(obj => {
                                return {
                                    'name': obj.name,
                                    'type': obj.type
                                }
                            })
                        );
                    }
                })                
            }           
            console.log(`You are currently in ${curUserDir}`)
        }
    })
}

