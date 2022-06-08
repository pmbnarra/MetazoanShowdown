var express = require('express');
var router = express.Router();
var rModel = require("../models/roomsModel");
            
router.get('/', async function(req, res, next) {
    let result = await rModel.getAllRooms();
    res.status(result.status).send(result.result);
});

//Get a room by id
router.get('/all/:player_id', async function(req, res, next) {
  let player_id = req.params.player_id;
  let result = await rModel.getPlayerRoom(player_id);
  res.status(result.status).send(result.result);
});

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  console.log("Get room with id "+id)
  let result = await rModel.getRoomById(id);
  res.status(result.status).send(result.result);
});

router.get('/create/:player_id', async function(req, res, next) {
  let player_id = req.params.player_id;
  let result = await rModel.createRoom(player_id);
  res.status(result.status).send(result.result);
});

router.post('/:room_id/join', async function (req, res, next) {
  let player_id = req.body.player_id
  let room_id = req.params.room_id
  let result = await rModel.joinRoom(player_id, room_id);
  res.status(result.status).send(result.result);
});

module.exports = router;


  
 
        