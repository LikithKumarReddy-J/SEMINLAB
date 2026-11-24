/* =====================================================
   PROFILE
===================================================== */

function loadProfile(){

    const user =
        getUser(
            currentUser.id
        );


    if(!user)
        return;


    document
    .getElementById(
        "profileName"
    )
    .textContent=
        user.name;


    document
    .getElementById(
        "profileEmail"
    )
    .textContent=
        user.email;


    document
    .getElementById(
        "bioInput"
    )
    .value=
        user.bio || "";


    document
    .getElementById(
        "profileAvatar"
    )
    .textContent=
        user.name
        .charAt(0)
        .toUpperCase();

}


function saveBio(){

    const bio =
        document
        .getElementById(
            "bioInput"
        )
        .value
        .trim();


    let users =
        getData(USERS);


    const user =
        users.find(
            u=>
            u.id===
            currentUser.id
        );


    user.bio=bio;


    saveData(
        USERS,
        users
    );


    currentUser.bio=bio;


    loadFriends();


    showToast(
        "Profile updated!"
    );

}


/* =====================================================
   ADMIN
===================================================== */

function loadAdmin(){

    if(
        currentUser.role!=="admin"
    )
        return;


    const users =
        getData(USERS);


    const posts =
        getData(POSTS);


    const reports =
        getData(REPORTS);


    document
    .getElementById(
        "userCount"
    )
    .textContent=
        users.length;


    document
    .getElementById(
        "postCount"
    )
    .textContent=
        posts.length;


    document
    .getElementById(
        "reportCount"
    )
    .textContent=
        reports.length;


    const table =
        document
        .getElementById(
            "usersTable"
        );


    table.innerHTML="";


    users.forEach(user=>{

        table.innerHTML += `

        <tr>

            <td>
                ${escapeHTML(
                    user.name
                )}
            </td>

            <td>
                ${escapeHTML(
                    user.email
                )}
            </td>

            <td>
                ${user.role}
            </td>

        </tr>

        `;

    });

}


