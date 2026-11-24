/* =====================================================
   LOGIN
===================================================== */

function login(){

    const email =
        document
        .getElementById("loginEmail")
        .value
        .trim()
        .toLowerCase();


    const password =
        document
        .getElementById("loginPassword")
        .value;


    const users =
        getData(USERS);


    const user =
        users.find(
            u =>
            u.email===email &&
            u.password===password
        );


    if(!user){

        alert(
            "Invalid email or password."
        );

        return;

    }


    currentUser=user;


    sessionStorage.setItem(
        "tru_session",
        user.email
    );


    showApp();

}


/* =====================================================
   SIGNUP
===================================================== */

function signup(){

    const name =
        document
        .getElementById("signupName")
        .value
        .trim();


    const email =
        document
        .getElementById("signupEmail")
        .value
        .trim()
        .toLowerCase();


    const password =
        document
        .getElementById("signupPassword")
        .value;


    if(
        !name ||
        !email ||
        !password
    ){

        alert(
            "Please fill all fields."
        );

        return;

    }


    if(password.length<6){

        alert(
            "Password must have at least 6 characters."
        );

        return;

    }


    let users =
        getData(USERS);


    if(
        users.some(
            u=>u.email===email
        )
    ){

        alert(
            "Email already registered."
        );

        return;

    }


    users.push({

        id:"u"+Date.now(),

        name:name,

        email:email,

        password:password,

        role:"user",

        bio:""

    });


    saveData(
        USERS,
        users
    );


    alert(
        "Account created successfully!"
    );


    document
    .getElementById("loginEmail")
    .value=email;


    showLogin();

}


/* =====================================================
   AUTH SCREENS
===================================================== */

function showSignup(){

    document
    .getElementById("loginBox")
    .style.display="none";


    document
    .getElementById("signupBox")
    .style.display="block";

}


function showLogin(){

    document
    .getElementById("signupBox")
    .style.display="none";


    document
    .getElementById("loginBox")
    .style.display="block";

}


