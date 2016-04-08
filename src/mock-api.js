import express from 'express';
import bodyParser from 'body-parser';

const NUM_THINGS = 25;

const router = express.Router();
router.use(bodyParser.json());

router.get('/things', (req, res) => {
  let ids = [];
  let i = 0;
  while (i++ < NUM_THINGS + 1) {
    ids.push(i);
  }
  res.send({ids});
});

router.get('/things/:id', (req, res) => {
  const id = req.params.id;
  if (id <= NUM_THINGS) {
    res.send({id, text: `This is API data for thing ${id}!`});
  } else {
    res.status(404).send('Not found');
  }
});

router.get('/number', (req, res) => {
  const number = Math.round(Math.random() * 100);
  setTimeout(() => {
    res.send({number});
  }, 1000);
});

router.put('/number', (req, res) => {
  let {number} = req.body;
  number = parseInt(number, 10);
  if (isNaN(number) || typeof number !== 'number') {
    return res.status(400).send('Not a number');
  }
  setTimeout(() => {
    res.send({number});
  }, 1000);
});


export default router;

