const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log('request.url =============> ', request.url)
    let view = './views/'
    response.statusCode = 200;
    switch (request.url){
        case "/" : 
        view += "index.html"
        break
        case "/contact-us":
        if(request.method.toLowerCase() === 'post'){
            let data = '';
            request.on('data', (chunk) => {
                data += chunk
            });
            request.on('end', ()=> {
                console.log(new URLSearchParams(data));
            });
            response.statusCode = 302;
            response.setHeader('Location', "/contact-us");
        }
        view += "contact.html"
        break
        default : 
        view += "404.html"
        break
    }

    response.setHeader('Content-Type', 'text/html');

    fs.readFile(view, {encoding : 'utf8'}, (error, content) => {
        if(error) console.error(error);
        if(content) {
            response.write(content);
        }
        response.end();
    })

    
});

server.on('listening', () => console.log("Server is ready"))
server.listen(4000);