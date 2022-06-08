var pool = require('./connection.js')

/*module.exports.attackCards = async function (player_id) {
    try {
      let getplayersql = `select room_player_id_1, room_player_id_2 from room where room_player_id_1 = $1 or room_player_id_2 = $1`;
      let resultplayer = await pool.query(getplayersql, [player_id]);
      console.log(resultplayer.rows[0])
      let enemy_id
      if (resultplayer.rows[0].room_player_id_1 != player_id){
        enemy_id = resultplayer.rows[0].room_player_id_1
      } else if (resultplayer.rows[0].room_player_id_2 != player_id){
        enemy_id = resultplayer.rows[0].room_player_id_2
      }
      let getenemysql = `Select playercard_player, playercard_card, playercard_cardstate, playercard_hp, playercard_damage, playercard_speed from playercard where playercard_player = $1`; //enemy cards
      let resultenemy = await pool.query(getenemysql, [enemy_id]);
      let enemy = resultenemy.rows[0];
      console.log(enemy)

      let getcardssql = `Select playercard_player, playercard_card, playercard_cardstate, playercard_hp, playercard_damage, playercard_speed from playercard where playercard_player = $1`; //player cards
      let resultcards = await pool.query(getcardssql, [player_id]);
      let cards_id = resultcards.rows[0];
      console.log(cards_id)

      let getcardhpsql = `Select playercard_hp from playercard where playercard_player = $1`; //enemy card
      let cardhpresult = await pool.query(getcardhpsql, [enemy_id]);
      let cardhealth = cardhpresult.rows[0];
      console.log(cardhealth)

      let getcarddamagesql =`Select playercard_damage from playercard where playercard_player = $1` //players card
      let carddamageresult = await pool.query(getcarddamagesql, [player_id]);
      let carddamage = carddamageresult.rows[0];
      console.log(carddamage)

      let subtractionresult = cardhealth.playercard_hp - carddamage.playercard_damage;
      console.log(subtractionresult)
      let subtractionsql = `Update playercard set playercard_hp = $1 where playercard_player = $2 and playercard_cardstate = 3`;
      let resultattack = await pool.query(subtractionsql, [subtractionresult, enemy_id]);
      let attack = resultattack.rows[0];
      return { status: 200, result: attack };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
}
*/
module.exports.Switchcards = async function (player_id, card_id) {
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
}
