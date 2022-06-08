async function drawPlayerCard(pId) {
    try {
        const response = await fetch(`/api/turns/${pId}/draw`);
        if (response.status == 200) {
           var actions = await response.json();
           return actions;
        } else {
            // Treat errors like 404 here
         //   console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function makeCardActive(pId) {
    try {
        const response = await fetch(`/api/turns/${pId}/active`);
        if (response.status == 200) {
           var actions = await response.json();
           return actions;
        } else {
            // Treat errors like 404 here
         //   console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function deadPlayerCard(pId) {
    try {
        const response = await fetch(`/api/turns/${pId}/dead`);
        if (response.status == 200) {
           var actions = await response.json();
           return actions;
        } else {
            // Treat errors like 404 here
         //   console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

/*
async function attackCard(dmg, pId) {
    try {
    
        const response = await fetch(`/api/actions/attack`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ dmg: dmg, pId:pId})
        });
        var result = await response.json();
        print(result)
        return { success: response.status == 200, result: result };
    } catch (err) {
        
        console.log(err);
    }
}*/
