async function attackOpponentCard(pId) {
    try {
        const response = await fetch(`/api/actions/${pId}/attack`);
        if (response.status == 200) {
           var attack = await response.json();
           return attack;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}
/*
async function switchPlayerCards(player_id, card_id) {
    try {
        const response = await fetch(`/api/actions/switch`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({player_id: player_id, card_id: card_id})
        });
        if (response.status == 200) {
            var switchcard = await response.json();
            return switchcard;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}*/

async function switchPlayerCards(player_id, card_id) {
    try {
       
        const response = await fetch(`/api/actions/${player_id}/switch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ player_id: player_id, card_id: card_id })
        });
        var result = await response.json();
        console.log(response);
        return { success: response.status == 200, result: result };
        
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function resetGame (player_id) {
    try {
        const response = await fetch(`/api/actions/${player_id}/reset`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({player_id: player_id})
        });
        if (response.status == 200) {
            var attack = await response.json();
            return attack;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}