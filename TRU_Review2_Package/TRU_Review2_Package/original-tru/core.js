/* =====================================================
   STORAGE
===================================================== */

const USERS = "tru_users_v2";
const POSTS = "tru_posts_v2";
const FRIENDS = "tru_friends_v2";
const REQUESTS = "tru_requests_v2";
const MESSAGES = "tru_messages_v2";
const CIRCLES = "tru_circles_v2";
const REPORTS = "tru_reports_v2";
const REGISTRATIONS = "tru_registrations_v2";

let currentUser = null;
let selectedFriend = null;
let selectedEvent = null;


/* =====================================================
   STORAGE HELPERS
===================================================== */

function getData(key){

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}


function saveData(key,data){

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


/* =====================================================
   INITIAL DATA
===================================================== */

function initialize(){

    let users = getData(USERS);


    const defaultUsers = [

        {
            id:"admin",
            name:"Tru Admin",
            email:"admin@tru.com",
            password:"Admin@123",
            role:"admin",
            bio:"Platform Administrator"
        },

        {
            id:"u1",
            name:"Meena",
            email:"meena@tru.com",
            password:"Meena@123",
            role:"user",
            bio:"B.Tech student | Tech lover"
        },

        {
            id:"u2",
            name:"Ananya",
            email:"ananya@tru.com",
            password:"Ananya@123",
            role:"user",
            bio:"Music and books"
        },

        {
            id:"u3",
            name:"Rahul",
            email:"rahul@tru.com",
            password:"Rahul@123",
            role:"user",
            bio:"Technology enthusiast"
        },

        {
            id:"u4",
            name:"Sneha",
            email:"sneha@tru.com",
            password:"Sneha@123",
            role:"user",
            bio:"Photography lover"
        },

        {
            id:"u5",
            name:"Arjun",
            email:"arjun@tru.com",
            password:"Arjun@123",
            role:"user",
            bio:"Sports and fitness"
        },

        {
            id:"u6",
            name:"Kavya",
            email:"kavya@tru.com",
            password:"Kavya@123",
            role:"user",
            bio:"Design and creativity"
        },

        {
            id:"u7",
            name:"Vivek",
            email:"vivek@tru.com",
            password:"Vivek@123",
            role:"user",
            bio:"Coding learner"
        },

        {
            id:"u8",
            name:"Pooja",
            email:"pooja@tru.com",
            password:"Pooja@123",
            role:"user",
            bio:"Travel and food"
        }

    ];


    defaultUsers.forEach(user=>{

        if(
            !users.some(
                u=>u.email===user.email
            )
        ){

            users.push(user);

        }

    });


    saveData(
        USERS,
        users
    );


    let posts = getData(POSTS);


    if(posts.length===0){

        posts=[

            {
                id:1,
                userId:"u2",
                text:"Anyone interested in the weekend music event? 🎵",
                image:"",
                likes:["u3"],
                comments:[
                    {
                        name:"Rahul",
                        text:"Sounds interesting!"
                    }
                ]
            },

            {
                id:2,
                userId:"u3",
                text:"Found a useful student technology meetup happening soon.",
                image:"",
                likes:[],
                comments:[]
            },

            {
                id:3,
                userId:"u4",
                text:"Looking for photography lovers around Vijayawada 📷",
                image:"",
                likes:[],
                comments:[]
            }

        ];


        saveData(
            POSTS,
            posts
        );

    }

}



/* =====================================================
   SHOW APP
===================================================== */

function showApp(){

    document
    .getElementById("authPage")
    .style.display="none";


    document
    .getElementById("app")
    .style.display="block";


    document
    .getElementById("navName")
    .textContent=currentUser.name;


    document
    .getElementById("navAvatar")
    .textContent=
        currentUser.name
        .charAt(0)
        .toUpperCase();


    if(
        currentUser.role==="admin"
    ){

        document
        .getElementById("adminMenu")
        .style.display="block";

    }


    loadFeed();

    loadFriends();

    loadRequests();

    loadChatUsers();

    loadCircles();

    loadProfile();

    loadAdmin();

}


/* =====================================================
   LOGOUT
===================================================== */

function logout(){

    sessionStorage.removeItem(
        "tru_session"
    );

    location.reload();

}



/* =====================================================
   NAVIGATION
===================================================== */

function openPage(
    page,
    clickedButton
){

    const moduleMap = {
        home:"social",
        create:"social",
        friends:"social",
        chat:"social",
        search:"social",
        events:"discover",
        circles:"discover",
        profile:"admin",
        admin:"admin"
    };

    document
    .querySelectorAll(".module")
    .forEach(m=>{
        m.classList.remove("active-module");
    });

    const moduleName = moduleMap[page];

    if(moduleName){
        const module =
            document.getElementById("module-"+moduleName);

        if(module){
            module.classList.add("active-module");
        }
    }

    document
    .querySelectorAll(".page")
    .forEach(p=>{
        p.classList.remove("active");
    });

    const target =
        document.getElementById(page);

    if(target){
        target.classList.add("active");
    }

    document
    .querySelectorAll(".menu")
    .forEach(b=>{
        b.classList.remove("active");
    });

    if(clickedButton){
        clickedButton.classList.add("active");
    }

    if(page==="friends"){
        loadFriends();
        loadRequests();
    }

    if(page==="chat"){
        loadChatUsers();
    }

    if(page==="profile"){
        loadProfile();
    }

    if(page==="circles"){
        loadCircles();
    }

    if(page==="admin"){
        loadAdmin();
    }
}

/* =====================================================
   MODAL
===================================================== */

function closeModal(id){

    document
    .getElementById(id)
    .style.display="none";

}


window.onclick=function(event){

    if(
        event.target.classList
        .contains("modal")
    ){

        event.target.style.display=
            "none";

    }

};


/* =====================================================
   TOAST
===================================================== */

function showToast(message){

    const toast =
        document
        .getElementById(
            "toast"
        );


    toast.textContent=message;

    toast.style.display="block";


    setTimeout(
        ()=>{
            toast.style.display="none";
        },
        2500
    );

}


/* =====================================================
   SECURITY HELPER
===================================================== */

function escapeHTML(text){

    return String(text)

    .replace(
        /&/g,
        "&amp;"
    )

    .replace(
        /</g,
        "&lt;"
    )

    .replace(
        />/g,
        "&gt;"
    )

    .replace(
        /"/g,
        "&quot;"
    )

    .replace(
        /'/g,
        "&#039;"
    );

}


