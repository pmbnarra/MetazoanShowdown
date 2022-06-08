var express = require('express');
var router = express.Router();
var aModel = require("../models/endTurnModel");
            
router.get('/:pId/draw', async function(req, res, next) {
  console.log("Draw card to player's hand");
  let pId = req.params.pId;
  let result = await aModel.drawCard(pId);
  res.status(result.status).send(result.result);
});

router.get('/:pId/active', async function(req, res, next) {
  console.log("Make card active");
  let pId = req.params.pId;
  let result = await aModel.makeActive(pId);
  res.status(result.status).send(result.result);
});

router.get('/:pId/dead', async function(req, res, next) {
  console.log("Draw card to player's hand");
  let pId = req.params.pId;
  let result = await aModel.deadCard(pId);
  res.status(result.status).send(result.result);
});

module.exports = router;