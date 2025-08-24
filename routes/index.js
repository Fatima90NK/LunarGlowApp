import express from 'express';
const router = express.Router();
//const db = require("../model/helper")
/* GET home page. */

router.get('/funFacts', async (req, res, next) => {//this get api IS RESPONSIBLE FOR RETURNING ALL THE FUNFACTS IN THE TABLE
const result = await db("SELECT * FROM funFacts");
console.log(result.data);
res.send(result.data);

});

export default router;
