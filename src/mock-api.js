import express from 'express';


const NUM_THINGS = 25;

const router = express.Router();

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

router.get('/random', (req, res) => {
  const random = Math.round(Math.random() * 100);
  res.send({random});
});


export default router;

