var express = require('express');
var router = express.Router();
var deckModel = require("../models/deckModel");

router.post('/:player_id/clear', async function(req, res, next) {
  console.log("Delete deck from the player");
  //let player_id = req.params.player_id;
  let player_id = req.params.player_id;
  let result = await deckModel.clearDeck(player_id);
  res.status(result.status).send(result.result);
});

router.post('/:player_id/deck1', async function(req, res, next) {
  console.log("Create deck for the player");
  let player_id = req.params.player_id;
  let pcCardId = req.body.pcCardId;
  let result = await deckModel.createDeck(player_id, pcCardId);
  res.status(result.status).send(result.result);
});

/*
router.get('/:pId/deck', async function(req, res, next, pId) {
    console.log("Get deck for player in a match");
    let pId = req.params.pId;
   // let pmId = req.params.pmId;
    let result = await pModel.getPlayerCards(pId);
    res.status(result.status).send(result.result);
  });
  */

module.exports = router;
