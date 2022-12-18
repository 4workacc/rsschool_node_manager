import * as fs from 'fs'
import * as zlib from 'zlib';

export const displayWorkDir = ( curDir ) => {
    console.log(`You are currently in ${curDir}`)
}
export const readFile = (filePath) => {
    const fileName = fs.createReadStream(filePath);
    fileName.on('data', data=>{
        console.log(data.toString())
    })
}

export const compressFile = (filePath, gzipPath) => {
    const fil = fs.createReadStream(`${filePath}`);
    const zip = fs.createWriteStream(`${gzipPath}`);
    const zi = zlib.createBrotliCompress();
    fil.pipe(zi).pipe(zip);
    console.log(`File ${filePath} compressed to ${gzipPath}`);
}
export const decompressFile = (gzipPath, filePath) => {
    const fil = fs.createReadStream(`${gzipPath}`);
    const zip = fs.createWriteStream(`${filePath}`, {encoding: 'utf-8'});
    const zi = zlib.createBrotliCompress();
    fil.pipe(zi).pipe(zip);
    console.log(`File ${gzipPath} decompressed to ${filePath}`);
}