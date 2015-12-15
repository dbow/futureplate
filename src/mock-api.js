import express from 'express';


const router = express.Router();

router.get('/things', (req, res) => {
  const NUM_THINGS = 25;
  let ids = [];
  let i = 0;
  while (i++ < NUM_THINGS) {
    ids.push(i);
  }
  res.send({ids});
});

router.get('/things/:id', (req, res) => {
  const id = req.params.id;
  res.send({id, text: `This is API data for thing ${id}!`});
});


export default router;

