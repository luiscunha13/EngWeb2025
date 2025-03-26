var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res) {
  axios.get('http://localhost:16000/contratos')
    .then(resp => {
      res.status(200).render('contratos', { lcontratos: resp.data, title: 'Lista de Contratos' });
    })
    .catch(error => {
      console.log(error)
      res.status(500).render('error', {error: error});
    });
});

router.get('/:id', function(req, res) {
  axios.get('http://localhost:16000/contratos/'+req.params.id)
    .then(resp => {
      res.status(200).render('contrato', { contrato: resp.data, title: `Contrato ${req.params.id}` });
    })
    .catch(error => {
      console.log(error)
      res.status(500).render('error', {error: error});
    });
});

router.get('/entidades/:id', function(req, res) {
  axios.get('http://localhost:16000/contratos?entidade='+req.params.id)
    .then(resp => {
      let sum = resp.data.reduce((total, { precoContratual }) => total + precoContratual, 0).toFixed(2);
      res.status(200).render('entidade', { 
        lcontratos: resp.data, 
        entidade: resp.data[0].entidade_comunicante,
        nipc: req.params.id,
        soma: sum
        });
    })
    .catch(error => {
      console.log(error)
      res.status(500).render('error', {error: error});
    });
});


module.exports = router;
