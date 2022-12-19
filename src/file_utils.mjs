import * as fs from 'fs';

export const cat_util = (path) => {
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            console.log('Error: file dont exist')
        } else {
            let rSteam = fs.createReadStream(path, { encoding: 'utf-8' });
            rSteam.on('readable', () => {
                let dat = rSteam.read();
                if (dat != null) {
                    console.log(dat);
                }
            })
        }
    })
}

export const add_file_util = (path, curUserDir) => {
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            fs.writeFile(path, '', () => { });
            console.log('File succesfully created');
            console.log(`You are currently in ${curUserDir}`)
        }
        else {
            console.log('Error: file already exist');
            console.log(`You are currently in ${curUserDir}`)
        }
    });
    console.log(`You are currently in ${curUserDir}`)
}

export const delete_util = (curUserDir, param) => {
    if (!param) { console.log('Error: file should be named') }
    else {
        fs.access(`${curUserDir}\\${param}`, fs.F_OK, (err) => {
            if (err) {
                console.log('Error: file dont exist')
            }
            else {
                fs.unlink(`${curUserDir}\\${param}`, (err) => {
                    if (err) { console.log('Delete file error') }
                    else console.log(`File ${param} deleted successfully`)
                })
            }
        })
    }
    console.log(`You are currently in ${curUserDir}`);
}

export const rename_util = (curUserDir, param, param1) => {
    fs.access(`${curUserDir}\\${param}`, fs.F_OK, (err0) => {
        if (err0) console.log('Error: start file dont exist')
        else {
            fs.access(`${curUserDir}\\${param1}`, fs.F_OK, (err1) => {
                if (err1) console.log('Error: file with newName already exist')
                else {
                    fs.rename(`${curUserDir}\\${param}`, `${curUserDir}\\${param1}`, (err2) => {
                        if (err2) {
                            console.log('Error: some error at renaming');
                        }
                        else {
                            console.log('File rename succesfully');
                        }
                    })
                }
            })

        }
    })
    console.log(`You are currently in ${curUserDir}`)
};

export const copy_util = (curUserDir, path, newPath) => {
    fs.lstat(`${curUserDir}\\${newPath}`, (err, start) => {
        if ( err || !start.isDirectory()) { console.log('Error: target directory dont exist'); return 0} 
        else {
            fs.access(`${curUserDir}\\${path}`, fs.F_OK, (err1)=>{
                if ( err1 ) { console.log('Error: file dont exist'); return 0} 
                else {
                    let rSteam = fs.createReadStream(`${curUserDir}\\${path}`);
                    let wStream = fs.createWriteStream(`${curUserDir}\\${newPath}\\${path}`);
                    rSteam.pipe(wStream);
                    console.log(`File ${path} copyed to folder ${newPath}`)
                    return 1;
                }
            })
        }
    } )   
    console.log(`You are currently in ${curUserDir}`)
}

export const move_util = (curUserDir, path, newPath) => {
    fs.lstat(`${curUserDir}\\${newPath}`, (err, start) => {
        if ( err || !start.isDirectory()) { console.log('Error: target directory dont exist');} 
        else {
            fs.access(`${curUserDir}\\${path}`, fs.F_OK, (err1)=>{
                if ( err1 ) { console.log('Error: file dont exist');} 
                else {
                    let rSteam = fs.createReadStream(`${curUserDir}\\${path}`);
                    let wStream = fs.createWriteStream(`${curUserDir}\\${newPath}\\${path}`);
                    rSteam.pipe(wStream);
                    console.log(`File ${path} moved to folder ${newPath}`)                    
                }
            })
        }
    } )  ;
    fs.unlink(`${curUserDir}\\${path}`, (err)=>{})
    console.log(`You are currently in ${curUserDir}`)
}