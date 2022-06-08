var pool = require('./connection.js')

module.exports.attackCard = async function (playerId) {
  try {
    let sql = `update playercard set playercard_hp = playercard_hp - (select playercard_damage from playercard where playercard_cardstate = 3 and playercard_player = $1)
    where playercard_cardstate = 3 and playercard_player != $1`;
    let result = await pool.query(sql, [playerId]);
    let attack = result.rows;
    return { status: 200, result: attack };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
} 

  module.exports.switchCards = async function (player_id, card_id) {
    try {
      let sql = `update playercard set playercard_cardstate = 4 where playercard_player = $1 and playercard_cardstate = 3`;
      result = await pool.query(sql,[player_id]);
      console.log(result.rows[0]);
      let sql2 = `update playercard set playercard_cardstate = 3 where playercard_player = $1 and playercard_card = $2`;
      result = await pool.query(sql2, [player_id, card_id]);

      return {status:200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.Resetgame = async function (player_id) {
    try {
      let resetcardssql = `Update playercard Set playercard_hp=(Select card_hp From card Where card_id = playercard_card ), playercard_cardstate = 1 
      Where playercard_player = $1`;
       result = await pool.query(resetcardssql, [player_id]);
      console.log(result.rows[0]);
      let GetOuttaHeresql = `Delete from room where room_id = (Select room_id From room where room_player_id_1 = $1 or room_player_id_2 = $1)`;
       result = await pool.query(GetOuttaHeresql, [player_id]);
      
      return { status: 200, result: result };
      } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  /*
  module.exports.switchCards = async function (player_id, card_id) {
    try{
      let checksql = `Select count(*) from playercard where playercard_cardstate = 2 or playercard_cardstate = 4 and playercard_player = $1`;
      let checkresult = await pool.query(checksql, [player_id]);
      let cardnumber = checkresult.rows;
      if (cardnumber >  0) {
      let sql = `Select playercard_card from playercard where playercard_cardstate = 2 or playercard_cardstate = 4 and playercard_player = $1 and playercard_card = $2`;
      let result = await pool.query(sql, [player_id, card_id]);
      let cards = result.rows[0];

      let currentcard = `Select playercard_card from playercard where playercard_cardstate = 3 and playercard_player = $1`;
      let currentresult = await pool.query(currentcard, [player_id]);
      let currentactivecard = currentresult.rows[0];

      let newcard = `Update playercard set playercard_cardstate = 3 where playercard_player = $1 and playercard_card = $2`;
      let selectedresult = await pool.query(newcard, [player_id, cards]);
      let newactivecard = selectedresult.rows[0];
      console.log(newactivecard)

      let newhandcard = `Update playercard set playercard_cardstate = 2 where playercard_player = $1 and playercard_card = $2`;
      let newhandresult = await pool.query(newhandcard, [player_id, currentactivecard]);      
      let switchcards = newhandresult.rows[0];
      }

      return { status: 200, result: something };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err};
    }
}*/
