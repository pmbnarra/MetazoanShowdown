var pool = require('./connection.js')

module.exports.getAllRooms = async function() {
  try {
    let sql = "Select * from room";
    let result = await pool.query(sql);
    let rooms = result.rows;
    return { status: 200, result: rooms};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}  

//Function to get room by id (to avoid sql injection)


module.exports.getPlayerRoom = async function (player_id) {
  try {
      let sql = `Select * from room
                  where  room_player_id_1 = $1 or room_player_id_2 = $1`;
      let result = await pool.query(sql, [player_id]);
      let rooms = result.rows[0]
      return { status: 200, result: rooms };
  } catch (err) {
      console.log(err);
      return { status: 500, result: err };
  }
}

module.exports.getRoomById = async function (id) {
  try {
    let sql = "Select * from room where room_id = $1";
    let result = await pool.query(sql, [id]);
    if (result.rows.length > 0) {
      let room = result.rows[0];
      return { status: 200, result: room };
    } else {
      return { status: 404, result: { msg: "No room with that id" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.createRoom = async function (player_id) {
  try {
          let sql = `insert into room (room_player_id_1,room_current_player) 
                  values ($1, $1)`;
                  let result = await pool.query(sql, [player_id]);
                  return { status: 200, result: result.rows };
              } catch (err) {
                  console.log(err);
                  return { status: 500, result: err };
      }
}

module.exports.joinRoom = async function (player_id,room_id) {
  try {
          let sql = `update room 
          set room_player_id_2 = $1 where room_id = $2 and room_player_id_1 != $1 and room_player_id_2 is null`;
                  let result = await pool.query(sql, [player_id,room_id]);
                  return { status: 200, result: result.rows };
              } catch (err) {
                  console.log(err);
                  return { status: 500, result: err };
      }
}