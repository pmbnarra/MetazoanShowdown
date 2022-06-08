async function registerPlayer() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let res = await register(name,password);
        alert(res.msg);    
        window.location = "index.html";  
    } catch (err) {
        console.log(err);
    }
}