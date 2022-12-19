import * as fs from 'fs';
import * as crypto from 'crypto';

export const hash_util = (curUserDir, param) => {
    fs.access(`${curUserDir}\\${param}`, fs.F_OK, (err) => {
        if (err) { console.log('Error: file dont exist') }
        else {
            let textData = fs.readFile(`${curUserDir}\\${param}`, (err1, textData)=>{
                if (err1) { console.log('Error')}
                else {
                    let hash = crypto.createHash('sha256');
                    let data = hash.update(textData.toString(), 'utf-8');
                    let gen_hash = data.digest('hex');
                    console.log(gen_hash)
                }
            })           
        }
    });
    console.log(`You are currently in ${curUserDir}`)
}