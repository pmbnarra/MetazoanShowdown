var pool = require('./connection.js')

  module.exports.drawCard = async function (playerId) {
    try {
        let sql = `update playercard set playercard_cardstate = 2 
        where playercard_card = (select playercard_card from playercard where playercard_player = $1 and playercard_cardstate = 1
        ORDER BY RANDOM() limit 1)`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let player = result.rows;
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "Cannot draw card" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
// when card dies
  module.exports.makeActive = async function (playerId) {
    try {
        let sql = `update playercard set playercard_cardstate = 3
        where playercard_card = (select playercard_card from playercard where playercard_player = $1 and playercard_cardstate != 5
        ORDER BY RANDOM() limit 1)`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let player = result.rows;
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "Cannot make active" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
// sends to cemetery
  module.exports.deadCard = async function (playerId) {
    try {
        let sql = `update playercard set playercard_cardstate = 5
         where playercard_player = $1 and playercard_cardstate = 3`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let player = result.rows;
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "Cannot kill card" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

