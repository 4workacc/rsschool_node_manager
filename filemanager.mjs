import process from 'process';

const userName = process.argv[2];
console.log(`Welcome to the File Manager, ${userName}!`)
process.stdin.on('data', data => {
    let command = data.toString().trim();
    console.log(command === '.exit')
    switch (command) {
        case '.exit':
            console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
            process.stdin.pause()
        default:
            console.log('Unkmnown command')
    }
})

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.stdin.pause();
})

