async function switchOut(pId, selectedcards) {
    try {
        const response = await fetch(`/api/actions/${pId}/${selectedcards}/switch`,
        {
            method: "POST",
        });
        var  result= await response.json();
        return {success: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}