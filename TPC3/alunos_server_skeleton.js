// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if(req.url=== '/' || req.url === 'alunos'){
                    axios.get('http://localhost:3000/alunos')
                        .then(resp => {
                            alunos = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentsListPage(alunos, d))
                            res.end()
                        })
                        .catch(err => {
                            console.log(err)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        })
                

                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url === '/alunos/registo'){
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if(req.url.match(/\/alunos\/[A|PG]\d+$/)){
                    id = req.url.split("/")[2]
                    console.log(id)
                    axios.get('http://localhost:3000/alunos?id=' + id)
                        .then(resp => {
                            var aluno = resp.data[0]
                            console.log(aluno.id)
                            console.log(aluno.nome)
                            console.log(aluno.gitlink)
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentPage(aluno, d))
                            res.end()
                        })
                        .catch(err => {
                            console.log(err)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        })
                }
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if(req.url.match(/\/alunos\/edit\/[A|PG]\d+$/)){
                    id = req.url.split("/")[3]

                    axios.get('http://localhost:3000/alunos/' + id)
                        .then(resp => {
                            aluno = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentFormEditPage(resp.data, d))
                            res.end()
                        })
                        .catch(err => {
                            console.log(err)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        })
                }
                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if(req.url.match(/\/alunos\/delete\/[A|PG]\d+$/)){
                    id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/alunos/'+ id)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(`<p>Registo eliminado: ${id}</p>`)
                                    res.end()
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end()
                                })
                  
                }
                // GET ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end()
                }
               
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if(req.url === '/alunos/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/alunos', result)
                                .then(resp => {
                                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(`<p>Registo inserido: ${JSON.stringify(resp.data)}</p>`)
                                    res.end()
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end()
                                })
                        }
                        else{
                            console.log('No body data')
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        }
                        console.log(result)
                        
                    })
                }
                else if(req.url.match(/\/alunos\/edit\/[A|PG]\d+$/)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/alunos/ ' + result.id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(`<p>Registo atualizado: ${JSON.stringify(resp.data)}</p>`)
                                    res.end()
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end()
                                })
                        }
                        else{
                            console.log('No body data')
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        }
                        
                    })
                }
                else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end()
                }
                break;
                // POST /alunos/edit/:id --------------------------------------------------------------------
                
                // POST ? -> Lancar um erro
            case "PUT":
                break;
            case "DELETE":
            default: 
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p>Método não suportado: " + req.method+"</p>")
                res.end()
                break
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



