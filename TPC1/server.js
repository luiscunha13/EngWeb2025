const http = require('http');
const axios = require('axios');

http.createServer((req, res) => {
    console.log("Method: " + req.method);
    console.log("Url: " + req.url);
    
    switch(req.method){
        case "GET":
            if(req.url === "/"){    
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                res.write("<h1>Oficina</h1>");
                res.write("<ul>");
                res.write('<li><a href="/reparacoes">Reparações</a></li>');
                res.write('<li><a href="/viaturas">Viaturas</a></li>');
                res.write('<li><a href="/intervencoes">Intervenções</a></li>');
                res.write("</ul>");
                res.end();
            }
            else if(req.url === "/reparacoes"){
                axios.get('http://localhost:3000/reparacoes?_sort=nome')
                    .then(result => {
                        var reparacoes = result.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<h1>Reparações</h1>")
                        res.write("<ul>")
                        reparacoes.forEach(element => {
                            res.write(`<li><a href='reparacoes/${element.nif}'>${element.nome}</a></li>`)
                        })
                        res.write("</ul>")
                        res.write("<h6><a href='/'>Voltar</a></h6>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()
                    });
            }
            else if(req.url.match(/\/reparacoes\/.+/)){
                if (req.url.startsWith("/reparacoes/")) {
                    const urlParts = req.url.split("/"); // Split the URL once
                    const nif = urlParts[2]; // Extract the common part (nif)
                    const extraPart = urlParts[3]; // Optional extra part (matricula or codigo)
                
                    if (!extraPart) {
                        // Case 1: /reparacoes/:nif
                        axios.get(`http://localhost:3000/reparacoes?nif=${nif}`)
                            .then(result => {
                                const reparacao = result.data[0];
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                                res.write("<h1>Reparacao</h1>");
                                res.write(`<p>Nome: ${reparacao.nome}</p>`);
                                res.write(`<p>Nif: ${reparacao.nif}</p>`);
                                res.write(`<p>Data: ${reparacao.data}</p>`);
                                res.write(`<p><a href='/reparacoes/${nif}/${reparacao.viatura.matricula}'>Viatura</a></p>`);
                                res.write("<p>Intervenções</p>");
                                res.write("<ul>");
                                reparacao.intervencoes.forEach(intervencao => {
                                    res.write(`<li><a href='/reparacoes/${nif}/${intervencao.codigo}'>${intervencao.codigo}</a></li>`);
                                });
                                res.write("</ul>");
                                res.write(`<h6><a href='/'>Voltar</a></h6>`);
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                                console.log(err);
                                res.end();
                            });
                    } else if (extraPart.startsWith("R")) {
                        // Case 2: /reparacoes/:nif/:codigo
                        axios.get(`http://localhost:3000/intervencoes?codigo=${extraPart}`)
                            .then(result => {
                                const intervencao = result.data[0];
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                                res.write("<h1>Intervenção</h1>");
                                res.write(`<p>Código: ${intervencao.codigo}</p>`);
                                res.write(`<p>Nome: ${intervencao.nome}</p>`);
                                res.write(`<p>Descrição: ${intervencao.descricao}</p>`);
                                res.write(`<h6><a href='/reparacoes/${nif}'>Voltar</a></h6>`);
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                                console.log(err);
                                res.end();
                            });
                        
                    } else {
                        // Case 3: /reparacoes/:nif/:matricula
                        axios.get(`http://localhost:3000/viaturas?matricula=${extraPart}`)
                            .then(result => {
                                const viatura = result.data[0];
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                                res.write("<h1>Viatura</h1>");
                                res.write(`<pre>Marca: ${viatura.marca}</pre>`);
                                res.write(`<pre>Modelo: ${viatura.modelo}</pre>`);
                                res.write(`<pre>Matrícula: ${viatura.matricula}</pre>`);
                                res.write(`<h6><a href='/reparacoes/${nif}'>Voltar</a></h6>`);
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                                console.log(err);
                                res.end();
                            });
                        
                    }
                } else {
                    // Handle other routes
                    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write("<h1>404 Not Found</h1>");
                    res.end();
                }
            }   
            else if(req.url === "/viaturas"){
                axios.get('http://localhost:3000/viaturas?_sort=marca')
                    .then(response => {
                        var viaturas = response.data
                        const mapMarcas = new Map();
         
                        for (const viatura of viaturas) {
                            if (!mapMarcas.has(viatura.marca)) {
                                mapMarcas.set(viatura.marca, []);
                            }
                            if(!mapMarcas.get(viatura.marca).includes(viatura.modelo))
                                mapMarcas.get(viatura.marca).push(viatura.modelo);
                        }

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<h1>Viaturas</h1>")
                        res.write("<ul>")
                        mapMarcas.forEach((modelos, marca) => {
                            res.write(`<li>${marca}</li>`)
                            res.write("<ul>")
                            modelos.forEach(modelo => {
                                res.write(`<li><a href='viaturas/${modelo}'>${modelo}</li>`)
                            })
                            res.write("</ul>")
                        })
                        res.write("</ul>")
                        res.write("<h6><a href='/'>Voltar</a></h6>")
                    })
                    .catch(err=> {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()
                    });
            }
            else if(req.url.match(/\/viaturas\/.+/)){
                var modelo = req.url.split("/")[2]
                const decodedModelo = decodeURIComponent(modelo);
                
                axios.get(`http://localhost:3000/viaturas?modelo=${modelo}`)
                        .then(result => {
                            var viaturas = result.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<h1>${decodedModelo}</h1>`)
                            res.write("<ul>")
                            viaturas.forEach(element => {
                                res.write(`<li>${element.matricula}</a></li>`)
                            })
                            res.write("</ul>")
                            res.write("<h6><a href='/viaturas'>Voltar</a></h6>")
                            res.end()

                        })
                        .catch(err => {
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            console.log(err)
                            res.end()
                        })

            }
            else if(req.url === "/intervencoes"){
                axios.get('http://localhost:3000/intervencoes?_sort=codigo')
                    .then(result => {
                        var reparacoes = result.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<h1>Intervenções</h1>")
                        res.write("<ul>")
                        reparacoes.forEach(element => {
                            res.write(`<li><a href='intervencoes/${element.codigo}'>${element.codigo}</a></li>`)
                        })
                        res.write("</ul>")
                        res.write("<h6><a href='/'>Voltar</a></h6>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()
                    });
            }
            else if(req.url.match(/\/intervencoes\/.+/)){
                var codigo = req.url.split("/")[2]

                axios.get(`http://localhost:3000/intervencoes?codigo=${codigo}`)
                        .then(result => {
                            var intervencao = result.data[0]
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<h1>${intervencao.codigo}</h1>`)
                            res.write(`<pre>Nome: ${intervencao.nome}</pre>`)
                            res.write(`<pre>Descrição: ${intervencao.descricao}</pre>`)
                            res.write("<h6><a href='/intervencoes'>Voltar</a></h6>")
                            res.end()

                        })
                        .catch(err => {
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            console.log(err)
                            res.end()
                        })
            }
            break;
        
        default : 
            res.writeHead(405, {'Content-Type': 'text/html;charset=utf-8'})
            res.end()
            break;    
    }



}).listen(1234);

console.log('Server running at http://localhost:1234/');