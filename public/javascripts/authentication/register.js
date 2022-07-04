async function registerPlayer() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        
        var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        if (!regex.test(password)){
            alert("The password is not secure. It must be longer than 8 characters, include a number, an uppercase letter and a lowercase letter");   
        }else{
            let res = await register(name,password);
            alert(res.msg);    
            window.location = "index.html";  
        }

    } catch (err) {
        console.log(err);
    }
}
