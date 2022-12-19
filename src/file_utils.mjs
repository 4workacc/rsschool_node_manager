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
            fs.writeFile(path,'', ()=>{});
            console.log('File succesfully created');
            console.log(`You are currently in ${curUserDir}`)
        }
        else {
            console.log('Error: file already exist');
            console.log(`You are currently in ${curUserDir}`)
        }
    });    
}

export const delete_util = (curUserDir, param) => {
    if (!param) { console.log('Error: file should be named') }
    else {     
        fs.access(`${curUserDir}\\${param}`, fs.F_OK, (err) => {
            if ( err ) {
                console.log('Error: file dont exist')
            }
            else {
                fs.unlink(`${curUserDir}\\${param}`, (err) => {
                    if (err) { console.log ('Delete file error') }
                    else console.log(`File ${param} deleted successfully`)
                })
            }
        })       
    }
    console.log(`You are currently in ${curUserDir}`);    
}