var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // render manda a renderizar  (generar y entregar)
  // la vista al cliente
  // calculando
  let emojieDataset = ['๐ป' , '๐จโ๐ป', '๐', '๐'];
  let emojie = emojieDataset[Math.floor(Math.random()* emojieDataset.length) ];
  res.render('index',
  // Este es el View Model 
  {
    title: 'Express',
    author: 'Emmanuel Vรกzquez',
    emojie
   });
});

module.exports = router;
