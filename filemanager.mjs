import process from 'process';

process.stdin.on('data', data=>{
    let command = data.toString().trim();
    console.log(command === '.exit')    
    switch ( command ) {
        case '.exit' :           
           console.log('Goodbay, ');
           process.stdin.pause()
        default :
            console.log('Unkmnown command')
    }
})

process.on('SIGINT', ()=>{
    console.log('Goodbay, ');
    process.stdin.pause();
})