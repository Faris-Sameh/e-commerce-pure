window.onload = function() {
    const isLoggedIn = checkLoginStatus();
    if (!isLoggedIn) {
      window.location.href = "Register.html";
    }
  }

if (window.location.pathname.endsWith('index.html') && localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'Login.html';
}

if(localStorage.getItem('isLoggedIn') === 'true'){
    document.querySelector("#Logout-btn").setAttribute("class","nav-item");
    document.querySelector(".loggingin").setAttribute("class","d-none");
}

document.querySelector("#loggingout").addEventListener("click",()=>{
    localStorage.removeItem('isLoggedIn');
    window.location="Register.html";
})

function validate() {
    var user = document.getElementById('user').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    var confirm = document.getElementById('confirm').value;
    var result = document.getElementById('result');

    result.style.transition = "all 0.5s linear";
    result.setAttribute("class", "alert alert-danger p-3 text-center");

    if (user == "" && email == "" && pass == "" && confirm == "") {
        result.innerHTML = "Please Enter Data";
        return false;
    } else if (user.length < 5 || user.length > 15) {
        result.innerHTML = "Enter Username between 5-15 characters";
        return false;
    } else if (email.indexOf("@") == -1) {
        result.innerHTML = "Enter Valid Email";
        return false;
    } else if (pass.length < 8) {
        result.innerHTML = "Enter Password minimum 8 characters";
        return false;
    } else if (pass != confirm) {
        result.innerHTML = "Please Enter Matched Passwords";
        return false;
    }

    localStorage.setItem('name', user);
    localStorage.setItem('email', email);
    localStorage.setItem('password', pass);
    window.location.href = "login.html?success=true";
    return false;
}

const params = new URLSearchParams(window.location.search);
const success = params.get("success");

if (success === "true") {
    const name = localStorage.getItem('name');
    const result = document.getElementById('result');

    result.textContent = `Welcome ${name}, your account was created successfully!`;
    result.classList.add("alert", "alert-success", "p-3", "text-center");

    setTimeout(() => {
        result.textContent = "";
        result.className = "";
    }, 5000);
}

document.querySelector("#Login-btn").addEventListener("click", (e) => {
    e.preventDefault();
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#pass").value;

    if (email === localStorage.getItem('email') && password === localStorage.getItem('password')) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location = "index.html";
    } else {
        const notification = document.createElement("h2");
        notification.className = "alert alert-danger alert-dismissible text-center position-relative";
        notification.innerHTML = "Wrong email or password";
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 1200);
    }
});