var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:17000/books')
  .then(resp => {
    res.status(200).render('books', { lbooks: resp.data, title: 'Lista de Livros' });
  })
  .catch(error => {
    console.log(error)
    res.status(500).render('error', {error: error});
  });
});

router.get('/:id', function(req, res) {
  axios.get('http://localhost:17000/books/'+req.params.id)
    .then(resp => {
      res.status(200).render('book', { book: resp.data, title: `Livro ${req.params.id}` });
    })
    .catch(error => {
      console.log(error)
      res.status(500).render('error', {error: error});
    });
});

router.get('/entidades/:id', function(req, res) {
  axios.get('http://localhost:17000/books?author='+req.params.id)
    .then(resp => {
      let sum = resp.data.length;
      res.status(200).render('author', { 
        lbooks: resp.data, 
        author: req.params.id,
        soma: sum
        });
    })
    .catch(error => {
      console.log(error)
      res.status(500).render('error', {error: error});
    });
});

module.exports = router;
