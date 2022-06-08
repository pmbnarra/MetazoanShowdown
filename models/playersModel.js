var pool = require('./connection.js')

module.exports.getPlayerCards = async function (pId) {
    try {
        let sqlCheck = `select * from player,card, playercard,cardstate
        where  playercard_player = $1 and playercard_player = player_id and playercard_card = card_id and playercard_cardstate = cardstate_id`;
        let resCheck = await pool.query(sqlCheck, [pId]);
        if (resCheck.rows.length == 0)
            return { status: 400, result: { msg: "That player does not exist" } };
        return { status: 200, result: resCheck.rows};
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}

module.exports.registerUser = async function (name, password) {
  try {
      let sql = `Insert into player(player_name, player_password) values($1,$2)`;
          await pool.query(sql, [name,password]);
          return { status: 200, result: { msg: "New player registered" } };
      } catch (err) {
      console.log(err);
      return { status: 500, result: err };
  }
}

module.exports.loginCheck = async function (name,password) {
    try {
      let sql = `Select player_id from player where player_name = $1 and player_password = $2`;
      let result = await pool.query(sql,[name,password]);
      if (result.rows.length == 0) {
          return { status: 401, result: {msg: "Wrong password or username."}}
      }
      let ply_id = result.rows[0].player_id;
      return { status: 200, result: {msg: "Login correct", userId : ply_id} };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.getLoggedUserInfo = async function (playerId) {
    try {
        let sql = `Select player_name,player_id from player where player_id = $1`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let player = result.rows[0];
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "No user with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.getOpponentLoggedUserInfo = async function (playerId) {
    try {
        let sql = `Select player_name,player_id from player where player_id != $1`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let player = result.rows[0];
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "No user with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }




  module.exports.endTurn = async function () {
    try {
        let sql = `UPDATE room 
        SET room_current_player =
              CASE WHEN room_current_player = room_player_id_1 THEN room_player_id_2
              WHEN room_current_player = room_player_id_2 THEN room_player_id_1 
              END`;
        let result = await pool.query(sql);
      let turn = result.rows;
      return { status: 200, result: turn };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.aliveCards = async function (playerId) {
    try {
        let sql = `select count (playercard_cardstate)from playercard where playercard_cardstate != 5 and playercard_player = $1`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let deadcard = result.rows[0];
            return { status: 200, result: deadcard };
        } else {
            return { status: 404, result: { msg: "No user with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
  
  module.exports.deckedCards = async function (playerId) {
    try {
        let sql = `select count (playercard_cardstate)from playercard where playercard_cardstate = 1 and playercard_player = $1`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let deadcard = result.rows[0];
            return { status: 200, result: deadcard };
        } else {
            return { status: 404, result: { msg: "No user with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.activeCards = async function (playerId) {
    try {
        let sql = `select count (playercard_cardstate)from playercard where playercard_cardstate = 3 and playercard_player = $1`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let deadcard = result.rows[0];
            return { status: 200, result: deadcard };
        } else {
            return { status: 404, result: { msg: "No user with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.getDamage = async function (pId) {
    try {
        let sql = `select playercard_hp from playercard where playercard_player = $1 and playercard_cardstate = 3`;
        let result = await pool.query(sql, [pId]);
        if (result.rows.length > 0) {
            let player = result.rows[0];
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "No user with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }  

  /*
  module.exports.turnNum = async function () {
    try {
        let sql = `UPDATE room 
        SET room_current_turn = room_current_turn + 1`;
        let result = await pool.query(sql);
      let turn = result.rows;
      return { status: 200, result: turn };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
  */

