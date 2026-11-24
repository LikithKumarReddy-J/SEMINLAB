/* =====================================================
   EVENTS DATA
===================================================== */

const events={


Vijayawada:[

{
id:"v1",
name:"Open Gigs Vijayawada",
category:"Music",
icon:"🎸",
area:"Moghalrajpuram",
date:"27 September 2026",
time:"6:30 PM",
organizer:"Open Gigs Team",
people:126,
description:
"An open music evening with student performances, local artists and an open mic."
},

{
id:"v2",
name:"Vijayawada Food & Street Fest",
category:"Food",
icon:"🍔",
area:"Benz Circle",
date:"28 September 2026",
time:"5:00 PM",
organizer:"City Food Club",
people:214,
description:
"Explore local food stalls, snacks, desserts and small food businesses."
},

{
id:"v3",
name:"KL Student Tech Connect",
category:"Technology",
icon:"💻",
area:"Vaddeswaram",
date:"29 September 2026",
time:"10:00 AM",
organizer:"Student Tech Community",
people:286,
description:
"A student meetup for coding, projects, technology discussions and networking."
},

{
id:"v4",
name:"Art & Culture Weekend",
category:"Culture",
icon:"🎨",
area:"Moghalrajpuram",
date:"30 September 2026",
time:"11:00 AM",
organizer:"Vijayawada Art Club",
people:98,
description:
"Art displays, student artwork, cultural performances and creative activities."
},

{
id:"v5",
name:"City Fun Run",
category:"Sports",
icon:"🏃",
area:"Krishna River Front",
date:"1 October 2026",
time:"6:00 AM",
organizer:"Vijayawada Runners",
people:174,
description:
"A community morning run suitable for students and local participants."
}

],


Guntur:[

{
id:"g1",
name:"Guntur Youth Meetup",
category:"Community",
icon:"👥",
area:"Brodipet",
date:"27 September 2026",
time:"5:00 PM",
organizer:"Youth Connect",
people:82,
description:
"A casual community meetup for students and young people."
},

{
id:"g2",
name:"Guntur Food Carnival",
category:"Food",
icon:"🍕",
area:"Arundelpet",
date:"28 September 2026",
time:"4:30 PM",
organizer:"Food Street Club",
people:163,
description:
"Local food, snacks and small business stalls."
},

{
id:"g3",
name:"Coding Saturday",
category:"Technology",
icon:"💻",
area:"Lakshmipuram",
date:"29 September 2026",
time:"10:00 AM",
organizer:"Code Guntur",
people:121,
description:
"A beginner-friendly coding and project discussion event."
},

{
id:"g4",
name:"Guntur Art Day",
category:"Art",
icon:"🎨",
area:"Nallapadu",
date:"30 September 2026",
time:"11:00 AM",
organizer:"Creative Guntur",
people:75,
description:
"A small creative event featuring local artists and student work."
}

],


Hyderabad:[

{
id:"h1",
name:"Hyderabad Tech Connect",
category:"Technology",
icon:"💻",
area:"HITEC City",
date:"27 September 2026",
time:"10:00 AM",
organizer:"Hyderabad Tech Community",
people:340,
description:
"A technology networking event for students and developers."
},

{
id:"h2",
name:"Hyderabad Live Music Night",
category:"Music",
icon:"🎵",
area:"Jubilee Hills",
date:"28 September 2026",
time:"7:00 PM",
organizer:"City Music Club",
people:230,
description:
"Live performances from local musicians."
},

{
id:"h3",
name:"Food Street Festival",
category:"Food",
icon:"🍴",
area:"Gachibowli",
date:"29 September 2026",
time:"5:30 PM",
organizer:"Hyderabad Food Club",
people:315,
description:
"A weekend food experience with local stalls and restaurants."
},

{
id:"h4",
name:"Hyderabad Fun Run",
category:"Sports",
icon:"🏃",
area:"Necklace Road",
date:"30 September 2026",
time:"6:30 AM",
organizer:"City Runners",
people:188,
description:
"A community running event around the city."
}

],


Chennai:[

{
id:"c1",
name:"Chennai Music Evening",
category:"Music",
icon:"🎵",
area:"T Nagar",
date:"27 September 2026",
time:"6:30 PM",
organizer:"Chennai Music Club",
people:180,
description:
"An evening of music and local performances."
},

{
id:"c2",
name:"Chennai Food Festival",
category:"Food",
icon:"🍜",
area:"Adyar",
date:"28 September 2026",
time:"4:00 PM",
organizer:"Chennai Food Circle",
people:240,
description:
"Local dishes, food stalls and community activities."
},

{
id:"c3",
name:"Student Coding Meetup",
category:"Technology",
icon:"💻",
area:"Anna Nagar",
date:"29 September 2026",
time:"10:30 AM",
organizer:"Code Chennai",
people:150,
description:
"A coding meetup for students and beginners."
},

{
id:"c4",
name:"Marina Fitness Morning",
category:"Sports",
icon:"🏃",
area:"Marina Beach",
date:"30 September 2026",
time:"6:00 AM",
organizer:"Chennai Fitness Club",
people:210,
description:
"A community fitness morning near Marina Beach."
}

],


Bengaluru:[

{
id:"b1",
name:"Bangalore Developer Meet",
category:"Technology",
icon:"💻",
area:"Koramangala",
date:"27 September 2026",
time:"10:00 AM",
organizer:"Developer Community",
people:310,
description:
"A developer meetup covering projects, coding and networking."
},

{
id:"b2",
name:"Indiranagar Music Night",
category:"Music",
icon:"🎸",
area:"Indiranagar",
date:"28 September 2026",
time:"7:00 PM",
organizer:"Bangalore Music Club",
people:270,
description:
"Live music performances and open mic sessions."
},

{
id:"b3",
name:"Creative Art Workshop",
category:"Art",
icon:"🎨",
area:"Whitefield",
date:"29 September 2026",
time:"2:00 PM",
organizer:"Creative Bengaluru",
people:105,
description:
"A creative workshop for students and young artists."
},

{
id:"b4",
name:"Weekend Food Walk",
category:"Food",
icon:"🍴",
area:"MG Road",
date:"30 September 2026",
time:"5:00 PM",
organizer:"Food Walk Bengaluru",
people:190,
description:
"Discover popular local food spots with other participants."
}

]

};


/* =====================================================
   EVENT SEARCH
===================================================== */

function quickLocation(place){

    document
    .getElementById(
        "placeInput"
    )
    .value=place;


    findEvents();

}


function findEvents(){

    const input =
        document
        .getElementById(
            "placeInput"
        )
        .value
        .trim();


    if(!input){

        alert(
            "Enter a place first."
        );

        return;

    }


    const key =
        Object.keys(events)
        .find(
            city =>
            city.toLowerCase()
            ===
            input.toLowerCase()
        );


    let eventList=[];


    if(key){

        eventList =
            events[key];

    }
    else{

        /*
           Demo fallback for any
           searched place.
        */

        eventList=[

        {
            id:"x1",
            name:"Local Community Meetup",
            category:"Community",
            icon:"👥",
            area:input,
            date:"27 September 2026",
            time:"5:00 PM",
            organizer:"tru Community",
            people:72,
            description:
            "A local meetup where people can connect and discover activities."
        },

        {
            id:"x2",
            name:"Open Music Evening",
            category:"Music",
            icon:"🎵",
            area:input,
            date:"28 September 2026",
            time:"6:30 PM",
            organizer:"Local Music Club",
            people:96,
            description:
            "Music performances and an open mic session."
        },

        {
            id:"x3",
            name:"Student Tech Meetup",
            category:"Technology",
            icon:"💻",
            area:input,
            date:"29 September 2026",
            time:"10:00 AM",
            organizer:"Student Tech Community",
            people:115,
            description:
            "A student-focused technology and project meetup."
        },

        {
            id:"x4",
            name:"Food & Culture Fest",
            category:"Culture",
            icon:"🍴",
            area:input,
            date:"30 September 2026",
            time:"5:00 PM",
            organizer:"Local Community",
            people:130,
            description:
            "Food, culture and local activities for the community."
        }

        ];

    }


    document
    .getElementById(
        "eventTitle"
    )
    .innerHTML=`

    <div class="card">

        <h3>
        Events around ${escapeHTML(input)}
        </h3>

        <p
        style="
        color:#777;
        margin-top:5px">

        ${eventList.length}
        events available

        </p>

    </div>

    `;


    const grid =
        document
        .getElementById(
            "eventGrid"
        );


    grid.innerHTML="";


    eventList.forEach(event=>{

        grid.innerHTML += `

        <div class="event-card">

            <div class="event-top">

                ${event.icon}

            </div>


            <div class="event-body">

                <span
                class="event-category">

                ${event.category}

                </span>


                <h3 class="event-name">

                    ${escapeHTML(
                        event.name
                    )}

                </h3>


                <div class="event-info">

                    📍 ${escapeHTML(
                        event.area
                    )}

                    <br>

                    📅 ${event.date}

                    <br>

                    ⏰ ${event.time}

                    <br>

                    👥 ${event.people}
                    people registered

                </div>


                <p
                class="event-description">

                    ${escapeHTML(
                        event.description
                    )}

                </p>


                <div class="event-footer">

                    <button
                    class="details-btn"
                    onclick='viewEvent(${JSON.stringify(event)})'>

                    View Details

                    </button>


                    <button
                    class="register-btn"
                    onclick='openRegistration(${JSON.stringify(event)})'>

                    Register

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}


/* =====================================================
   EVENT DETAILS
===================================================== */

function viewEvent(event){

    selectedEvent=event;


    const box =
        document
        .getElementById(
            "eventModalContent"
        );


    box.innerHTML=`

    <h2>
        ${event.icon}
        ${escapeHTML(event.name)}
    </h2>


    <span
    class="event-category">

        ${event.category}

    </span>


    <div class="modal-info">

        📍 <b>Area:</b>
        ${escapeHTML(event.area)}

        <br>

        📅 <b>Date:</b>
        ${event.date}

        <br>

        ⏰ <b>Time:</b>
        ${event.time}

        <br>

        👥 <b>Registered:</b>
        ${event.people}

        <br>

        👤 <b>Organizer:</b>
        ${escapeHTML(event.organizer)}

    </div>


    <p
    style="
    line-height:1.6;
    color:#555">

        ${escapeHTML(
            event.description
        )}

    </p>


    <button
    class="main-btn"
    onclick='openRegistration(${JSON.stringify(event)})'>

        🎫 Register Now

    </button>

    `;


    document
    .getElementById(
        "eventModal"
    )
    .style.display="block";

}


/* =====================================================
   EVENT REGISTRATION
===================================================== */

function openRegistration(event){

    selectedEvent=event;


    closeModal(
        "eventModal"
    );


    document
    .getElementById(
        "registerEventName"
    )
    .textContent=
        event.name;


    document
    .getElementById(
        "regName"
    )
    .value=
        currentUser.name;


    document
    .getElementById(
        "regEmail"
    )
    .value=
        currentUser.email;


    document
    .getElementById(
        "regMobile"
    )
    .value="";


    document
    .getElementById(
        "regCollege"
    )
    .value="";


    document
    .getElementById(
        "registrationSuccess"
    )
    .innerHTML="";


    document
    .getElementById(
        "registerModal"
    )
    .style.display="block";

}


function registerEvent(){

    const name =
        document
        .getElementById(
            "regName"
        )
        .value
        .trim();


    const mobile =
        document
        .getElementById(
            "regMobile"
        )
        .value
        .trim();


    const email =
        document
        .getElementById(
            "regEmail"
        )
        .value
        .trim();


    const college =
        document
        .getElementById(
            "regCollege"
        )
        .value
        .trim();


    const people =
        document
        .getElementById(
            "regPeople"
        )
        .value;


    if(
        !name ||
        !mobile ||
        !email ||
        !college
    ){

        alert(
            "Please fill all registration details."
        );

        return;

    }


    if(
        !/^[0-9]{10}$/.test(
            mobile
        )
    ){

        alert(
            "Enter a valid 10 digit mobile number."
        );

        return;

    }


    let registrations =
        getData(
            REGISTRATIONS
        );


    registrations.push({

        eventId:
            selectedEvent.id,

        event:
            selectedEvent.name,

        name:name,

        mobile:mobile,

        email:email,

        college:college,

        people:people,

        userId:
            currentUser.id,

        date:
            new Date()
            .toLocaleString()

    });


    saveData(
        REGISTRATIONS,
        registrations
    );


    document
    .getElementById(
        "registrationSuccess"
    )
    .innerHTML=`

    <div class="success-box">

        ✅ <b>Registration Successful!</b>

        <br><br>

        You are registered for:

        <br>

        <b>
            ${escapeHTML(
                selectedEvent.name
            )}
        </b>

        <br><br>

        Registration ID:
        TRU-${Date.now().toString().slice(-6)}

    </div>

    `;


    showToast(
        "Event registration completed!"
    );

}


/* =====================================================
   CIRCLES
===================================================== */

function createCircle(){

    const name =
        document
        .getElementById(
            "circleName"
        )
        .value
        .trim();


    if(!name){

        alert(
            "Enter a circle name."
        );

        return;

    }


    let circles =
        getData(CIRCLES);


    circles.push({

        id:Date.now(),

        name:name,

        owner:
            currentUser.id

    });


    saveData(
        CIRCLES,
        circles
    );


    document
    .getElementById(
        "circleName"
    )
    .value="";


    loadCircles();


    showToast(
        "Circle created!"
    );

}


function loadCircles(){

    const box =
        document
        .getElementById(
            "circleList"
        );


    const circles =
        getData(CIRCLES);


    const mine =
        circles.filter(
            c=>
            c.owner===
            currentUser.id
        );


    box.innerHTML="";


    if(mine.length===0){

        box.innerHTML=

        `<div class="card">

        <p style="color:#777">

        You haven't created any circles yet.

        </p>

        </div>`;

        return;

    }


    mine.forEach(
        circle=>{

            box.innerHTML += `

            <div class="circle-card">

                <div class="circle-icon">
                    👥
                </div>

                <h3>
                    ${escapeHTML(
                        circle.name
                    )}
                </h3>

                <p
                style="
                color:#777;
                margin:7px 0">

                Private community

                </p>


                <button
                class="friend-btn"
                onclick="
                alert('Circle opened!')">

                Open Circle

                </button>

            </div>

            `;

        }
    );

}


