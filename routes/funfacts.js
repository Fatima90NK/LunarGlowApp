import express from 'express';
const router = express.Router();


/* GET FUN FACTS listing. */
router.get('/', (req, res) => {
  res.send({ message: 'Fun Facts Endpoint working!' });
});

export default router;
