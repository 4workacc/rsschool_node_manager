export const eosHomedir = () => { 
    console.log(os.homedir()); 
}

export const eosUsername = () => {
    console.log(os.userInfo().username);
}

export const eosCPUS = () => {
    console.log(os.cpus());
}

export const eosArch = () => {
    console.log(os.arch());
}

export const eosEOL = () => {
    console.log(os.EOL);
}