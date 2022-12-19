import * as fs from 'fs'
import * as zlib from 'zlib';

export const compressFile = async (curUserDir, filePath, gzipPath) => {
    fs.stat(`${curUserDir}\\${filePath}`, (err, stat) => {
        if (stat === undefined) { console.log('Error: start file dont exist') } else {
            fs.stat(`${curUserDir}\\${gzipPath}`, (err, stat2) => {
                if (stat2 === undefined) {
                    const fil = fs.createReadStream(`${curUserDir}\\${filePath}`);
                    const zip = fs.createWriteStream(`${curUserDir}\\${gzipPath}`);
                    const zi = zlib.createBrotliCompress();
                    fil.pipe(zi).pipe(zip);
                    console.log(`File ${filePath} compressed to ${gzipPath}`);
                }
                else {
                    console.log('Error: zip file already exist')
                }
            })
        }
    })
    console.log(`You are currently in ${curUserDir}`)
}
export const decompressFile = (curUserDir, gzipPath, filePath) => {
    fs.stat(`${curUserDir}\\${gzipPath}`, (err, stat) => {
        if (stat === undefined) { console.log('Error: zip file dont exist') } else {
            fs.stat(`${curUserDir}\\${filePath}`, (err, stat2) => {
                if (stat2 === undefined) {
                    const fil = fs.createReadStream(`${gzipPath}`);
                    const zip = fs.createWriteStream(`${filePath}`);
                    const zi = zlib.createBrotliDecompress();
                    fil.pipe(zi).pipe(zip);
                    console.log(`File ${gzipPath} decompressed to ${filePath}`);
                }
                else {
                    console.log('Error: file already exist')
                }
            })
        }
    })
    console.log(`You are currently in ${curUserDir}`)
}



