import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const displayWorkDir = () => {
    console.log(`You are currently in ${dirname(fileURLToPath(import.meta.url))}`)
}