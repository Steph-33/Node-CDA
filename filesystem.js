const fs = require ('fs');
const EventEmitter  = require('events');

class FileSystem extends EventEmitter{
    createFile(){
        fs.mkdir('./folder', (error) => {
            if(error){
                console.error(error)
            }
            fs.writeFile('./folder/hello.txt', 'Hello World ! ', (err) => {
                if(err){
                    console.error(err)
                }
                this.emit('fileCreated')
            });
        })
    }
}

module.exports = FileSystem;