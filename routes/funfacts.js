var express = require('express');
var router = express.Router();
const db = require("../model/helper")

/* GET FUN FACTS listing. */
router.get('/', async function(req, res, next) {
  try {
    const results = await db(`select * from funfacts`)
    
    res.status(200).send(results)

  } catch (err) {
    res.status(400).send({message: err.message})
  }
});

module.exports = router;
