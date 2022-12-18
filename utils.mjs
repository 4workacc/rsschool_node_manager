import * as fs from 'fs'

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

}

export const decompressFile = (gzipFile, filePath) => {
    
}