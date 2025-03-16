var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { title: 'Engenharia das Webs 2025', 
      docente: 'jcr',
      instituicao: 'UMinho'
    });
});

router.get('/filmes', function(req, res) {
  axios.get('http://localhost:3000/filmes')
    .then(resp => {
      listaFilmes = resp.data;
      res.status(200).render('filmes', { lfilmes: resp.data, title: 'Lista de Filmes' });
    })
    .catch(error => {
      comsole.log(error)
      res.status(500).render('error', {error: error});
    });
});


router.get('/filmes/edit/:idFilme', function(req, res) {
  axios.get('http://localhost:3000/filmes/' + req.params.idFilme)
    .then(resp => {
      filme = resp.data;
      res.status(200).render('filmeEdit', { 'filme': filme});
    })
    .catch(error => {
      console.log(error)
      res.status(500).render('error', {error: error});
    });
});

router.post('/filmes/edit/:idFilme', function(req, res) {
  const actors = req.body.actors;
  const genres = req.body.genres
  
  const actorsArray = Array.isArray(actors) ? actors : [actors];
  const genresArray = Array.isArray(genres) ? genres : [genres];
  
  const filteredActors = actorsArray.filter(actor => actor.trim() !== '');
  const filteredGenres = genresArray.filter(genre => genre.trim() !== '');

  var filme = {
    id : req.params.idFilme,
    title: req.body.title,
    year: req.body.year,
    cast: filteredActors,
    genres: filteredGenres
  }

  axios.put('http://localhost:3000/filmes/'+ req.params.idFilme, filme)
    .then(resp => {
      console.log(resp.data);
      res.status(200).redirect('/filmes');
    })
    .catch(error => {
      console.log(error)
      res.status(500).render('error', {error: error});
    });
  
});

router.get('/filmes/delete/:idFilme', function(req, res) {
  axios.delete('http://localhost:3000/filmes/' + req.params.idFilme)
    .then(resp => {
      console.log(resp.data);
      res.status(200).redirect('/filmes');
    })
    .catch(error => {
      console.log(error)
      res.status(500).render('error', {error: error});
    });
});

router.get('/ator/:nomeAtor', function(req, res) {
  axios.get('http://localhost:3000/atores?nome=' + req.params.nomeAtor)
    .then(resp => {
      listaFilmes = resp.data[0];
      res.status(200).render('actor', { lfilmes: listaFilmes, title : 'Filmes de ator' });
    })
    .catch(error => {
      console.log(error)
      res.status(500).render('error', {error: error});
    });
});

module.exports = router;
