var attempts = 3 
var failed = false 

function UserCheck() {
    
    var username = document.getElementById("user").value; //get username and password from html
    var password = document.getElementById("pass").value;
    if (failed == false){ // if user stil has attempts left
        if(password == "spaceisCool"){ // if password is correct
            alert("Log In Successful"); //alert user and redirect to home page
            window.location = "index.html";
        }
        else{
            attempts--;//decrement attempts
            alert("Incorrect Credentials. You have "+attempts+" attempt(s) remaining."); //alert the user they got it wrong
            document.getElementById("pass").value = "";//clear password field

        }
        if (attempts <= 0){ // if theres no attempts remaining
            alert("Login Failed");
            failed = true;// lock user out
            
        }
    }
    else{
        alert("Locked out! 3 failed login attempts."); // alert the user that theyre locked out if they keep trying to get in
    }
}


function InputCheck() {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;// get username and password
    var usernameCheck = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;// email regex from emailregex.com
    var passwordCheck = /^[a-z]{7}[A-Z]{1}[a-z]{3}$/i; // password gotta be 3 lowercase then 1 uppercase then 3 lowercase
    if (username == "" || !usernameCheck.test(username)) { // check its an email
        document.getElementById("error1").innerHTML = "Invalid Email";// if its not alert the user
        return
    }
    else {
        document.getElementById("error1").innerHTML = ""; // if its right theres no error
    }
    if (password != "" && !passwordCheck.test(password)) {// check against password regex
        document.getElementById("error2").innerHTML = "Invalid Password";// if incorrect alert user
        return
    }
    else {
        document.getElementById("error2").innerHTML = "";
    }
        

}