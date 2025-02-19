export function genMainPage(data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Consultas</h1>
                </header>

                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/alunos">Lista de Alunos</a>
                        </li>
                        <li>
                            <a href="/cursos">Lista de Cursos</a>
                        </li>
                        <li>
                            <a href="/instrumentos">Lista de Instrumentos</a>
                        </li>
                    </ul>
                </div>
                
                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunosPage(lalunos,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Alunos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome</th>
                            <th>Id</th>
                        </tr>`
    lalunos.forEach(aluno => {
        pagHTML += `
        <tr>
            <td><a href='/aluno/${aluno.id}'>${aluno.nome}</td>
            <td>${aluno.id}</td> 
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>

                <div class="w3-container w3-center" style="margin: 20px;">
                    <a href="/" class="w3-button w3-purple w3-round">Voltar</a>
                </div>

                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursosPage(lcursos,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Cursos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Designação</th>
                            <th>Id</th>
                        </tr>`
    lcursos.forEach(curso => {
        pagHTML += `
        <tr>
            <td><a href='/curso/${curso.id}'>${curso.designacao}</td>
            <td>${curso.id}</td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>

                <div class="w3-container w3-center" style="margin: 20px;">
                    <a href="/" class="w3-button w3-purple w3-round">Voltar</a>
                </div>
                
                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentosPage(linstrumentos,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Instrumentos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome</th>
                            <th>Id</th>
                        </tr>`
    linstrumentos.forEach(instrumento => {
        pagHTML += `
        <tr>
            <td><a href='/instrumento/${instrumento.id}'>${instrumento['#text']}</td>
            <td>${instrumento.id}</td>
            
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>

                <div class="w3-container w3-center" style="margin: 20px;">
                    <a href="/" class="w3-button w3-purple w3-round">Voltar</a>
                </div>
                
                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunoPage(aluno, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>${aluno.id}</h1>
                </header>

                <div class="w3-container">
                    <p>Nome: ${aluno.nome}</p>
                    <p>Data de Nascimento: ${aluno.dataNasc}</p>
                    <p>Curso: ${aluno.curso}</p>
                    <p>Ano de Curso: ${aluno.anoCurso}</p>
                    <p>Instrumento: ${aluno.instrumento}</p>
                </div>

                <div class="w3-container w3-center" style="margin: 20px;">
                    <a href="/alunos" class="w3-button w3-purple w3-round">Voltar</a>
                </div>
                
                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursoPage(curso, alunos, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>${curso.id}</h1>
                </header>

                <div class="w3-container">
                    <p>Designação: ${curso.designacao}</p>
                    <p>Duração: ${curso.duracao}</p>
                    <p>Instrumento: ${curso.instrumento['#text']}</p>
                </div>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            
                        </tr>`
    alunos.forEach(aluno=> {
        pagHTML += `
        <tr>
            <td>${aluno.nome}</td>
            <td>${aluno.id}</td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>

                <div class="w3-container w3-center" style="margin: 20px;">
                    <a href="/cursos" class="w3-button w3-purple w3-round">Voltar</a>
                </div>

                
                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentoPage(instrumento, alunos, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>${instrumento.id} - ${instrumento['#text']}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome</th>
                            <th>Id</th>
                        </tr>`
    alunos.forEach(aluno=> {
        pagHTML += `
        <tr>
            <td>${aluno.nome}</td>
            <td>${aluno.id}</td>
        </tr>
        `
    });

    pagHTML += `  
                    </table>
                </div>

                <div class="w3-container w3-center" style="margin: 20px;">
                    <a href="/instrumentos" class="w3-button w3-purple w3-round">Voltar</a>
                </div>
                
                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}
  

