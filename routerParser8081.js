const {readFileSync, promises: fsPromises} = require('fs');
const fs = require('fs');
const colors = require('colors');
const { error } = require('console');


function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  //console.log(arr); 

  return arr;
}

let ipList = syncReadFile('./RESULT.txt');



async function tryConnection(data){ 
    try {
        await fetch(`http://${data}:8081/`).then(res => {
            let result = String(res.status)
            if(result == '200'){
                fs.appendFileSync(`Routers.txt`, `${data}\n`)
                console.log('[+] Ding Ding Ding!!!! Router here!!!'.green.bold)
            } else {
                console.log('[-] This is not a router(((')
            }
        //console.log(result)
        })
    } catch {
        console.log('[-] No response'.red)
    }
    
}



for (let step = 0; step < 10000; step++) {
    let ip = ipList[step]
    tryConnection(ip)
}