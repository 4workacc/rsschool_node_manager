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