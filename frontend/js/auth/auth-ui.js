const signup_form = document.getElementById("signup-form");
const login_form = document.getElementById("login-form");


const registerUser = async (fname, lname, email, password) => {    
    if (password.length < 6) {
        const message = document.querySelector(".message");
        message.innerHTML = "Password must be atleast 6 characters long.";
        message.classList.toggle("text-danger", true);
        return;
    } 

    const response = await createUser(fname, lname, email, password);    
    
    if (response.status == 201) {
        window.location.href = "login.html";        
    }

    else if (response.status == 409) {
        const message = document.querySelector(".message");
        
        message.innerHTML = "User with this email already exists.";
        message.classList.toggle("text-danger", true);
    }

    else {
        const message = document.querySelector(".message");        
        
        message.innerHTML = "Unable to create account.";
        message.classList.toggle("text-danger", true);
    }    

}

const login = async (email, password) => {    
    const response = await loginUser(email, password);

    if (response.status == 200) {
        const token = await response.json();
        
        localStorage.setItem("TOKEN", token.access_token)

        window.location.href = "index.html";     
    }

    else if (response.status == 401) {
        const message = document.querySelector(".message");        
        
        message.innerHTML = (await response.json()).message;
        message.classList.toggle("text-danger", true);
    }

    else {
        const message = document.querySelector(".message");
        
        message.innerHTML = "Unable to login.";
        message.classList.toggle("text-danger", true);
    }    

}

const logout = () => {
    localStorage.removeItem("TOKEN");
    window.location.href = "index.html";
}

const checkStoredCredentials = async () => {
    const jwt_token = localStorage.getItem("TOKEN");

    const login_btn = document.getElementById("login-btn")
    const signup_btn = document.getElementById("signup-btn")
    const dashboard_btn = document.getElementById("dashboard-btn")
    
    if (jwt_token) {        
        const current_user = await getLoggedInUser(jwt_token);        
        
        if (current_user) {            
            login_btn.classList.toggle("collapse", true)
            signup_btn.classList.toggle("collapse", true)
            dashboard_btn.classList.toggle("collapse", false)
        }
        else {
            login_btn.classList.toggle("collapse", false)
            signup_btn.classList.toggle("collapse", false)
            dashboard_btn.classList.toggle("collapse", true)
        }
    }
}

signup_form?.addEventListener('submit', e => {
    e.preventDefault();
    
    registerUser(
        document.getElementById("firstname-field").value,
        document.getElementById("lastname-field").value,
        document.getElementById("email-field").value,
        document.getElementById("password-field").value
    )
})

login_form?.addEventListener('submit', e => {
    e.preventDefault();
    
    login(        
        document.getElementById("email-field").value,
        document.getElementById("password-field").value
    )
})

checkStoredCredentials();