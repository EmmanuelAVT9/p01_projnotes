const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // render manda a renderizar  (generar y entregar)
  // la vista al cliente
  // calculando
  const emojieDataset = ['💻', '👨‍💻', '🎈', '🎄'];
  const emojie = emojieDataset[Math.floor(Math.random() * emojieDataset.length)];
  res.render(
    'index',
    // Este es el View Model
    {
      title: 'Express',
      author: 'Emmanuel Vázquez',
      emojie,
    },
  );
});

module.exports = router;
