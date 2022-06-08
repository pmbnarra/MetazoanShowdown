var express = require('express');
var router = express.Router();
var aModel = require("../models/actionModel"); 
              
router.get('/:pId/attack', async function(req, res, next) {
  console.log("Draw card to player's hand");
  let pId = req.params.pId;
  let result = await aModel.attackCard(pId);
  res.status(result.status).send(result.result);
});

  router.post('/:player_id/switch', async function (req, res, next) {
    console.log("Switch")
    let player_id = req.params.player_id
    let card_id = req.body.card_id
    let result = await aModel.switchCards(player_id, card_id);
    res.status(result.status).send(result.result);
});

router.post('/:player_id/reset', async function (req, res, next) {
  console.log("Resetting the game");
  let player_id = req.params.player_id;
  let result = await aModel.Resetgame(player_id);
  res.status(result.status).send(result.result);
});

module.exports = router;