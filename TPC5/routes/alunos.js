var express = require('express');
var router = express.Router();
var Aluno = require('../controlers/alunos');

router.get('/', function(req, res, next) {
  res.render('index', 
    { title: 'Engenharia das Webs 2025', 
      docente: 'jcr',
      instituicao: 'UMinho'
    });
});

router.get('/alunos', function(req, res, next) {
  Aluno.list()
  .then(dados => {
    res.render('alunosList', {slist: dados});
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.get('/alunos/edit/:id', function(req, res, next) {
  Aluno.findbyId(req.params.id)
  .then(dados => {
    res.render('formEdit', {aluno: dados});
  })
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.post('/alunos/edit/:id', function(req, res, next) {
  Aluno.update(req.params.id, req.body)
  .then(res.redirect('/alunos'))
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});

router.get('/alunos/registo', function(req, res, next) {
  res.render('formPage');
});

router.post('/alunos/registo', function(req, res, next) {
  Aluno.insert(req.body)
  .then(res.redirect('/alunos'))
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});


router.get('/alunos/delete/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
  .then(res.redirect('/alunos'))
  .catch(erro => {  
    res.status(500).jsonp(erro) 
  })
});




module.exports = router;
