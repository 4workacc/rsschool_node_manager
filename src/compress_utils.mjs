import * as fs from 'fs'
import * as zlib from 'zlib';

export const compressFile = (curUserDir, filePath, gzipPath) => {
    const fil = fs.createReadStream(`${filePath}`);
    const zip = fs.createWriteStream(`${gzipPath}`);
    const zi = zlib.createBrotliCompress();
    fil.pipe(zi).pipe(zip);
    console.log(`File ${filePath} compressed to ${gzipPath}`);
}
export const decompressFile = (curUserDir, gzipPath, filePath) => {
    const fil = fs.createReadStream(`${gzipPath}`);
    const zip = fs.createWriteStream(`${filePath}`, {encoding: 'utf-8'});
    const zi = zlib.createBrotliCompress();
    fil.pipe(zi).pipe(zip);
    console.log(`File ${gzipPath} decompressed to ${filePath}`);
}