var pool = require('./connection.js')
//var PlayerIDGet = await [pId]
//var getGetCards = require('./models/cardsModel.js')

module.exports.clearDeck = async function (player_id) {
    try {
      let sql = `
      DELETE FROM playercard
      WHERE playercard_player = $1;`;
      //let resCheck = await pool.query(sqlCheck, [pId]);
      //let result = await pool.query(sql);
      let result = await pool.query(sql, [player_id]);
      let deleted = result.rows;
      return { status: 200, result: deleted };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.getSelectedCards = async function (cardId,HP,Damage,Speed) {
    try {
      //let cardInfo = await getGetCards.getCardById(cardId)
      let sql = `
        select * from card where card_id = $1 and card_hp = $2 and card_damage = $3 and card_speed = $4`;
      let result = await pool.query(sql,[cardId, HP, Damage, Speed]);
      let SelectedCards = result.rows;
      return { status: 200, result: SelectedCards };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.createDeck = async function (player_id, pcCardId) {
    try {
      let sql = `
      insert into playercard (playercard_player,playercard_card,playercard_cardstate,playercard_hp,playercard_damage,playercard_speed)
      values($1,$2,1,(SELECT card_hp FROM card WHERE card_id=$2),(SELECT card_damage FROM card WHERE card_id=$2),(SELECT card_speed FROM card WHERE card_id=$2))`;
      result = await pool.query(sql,[player_id, pcCardId]);
      return { status: 200, result: result};
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
