/* =====================================================
   CREATE POST
===================================================== */

let selectedImage="";


function previewImage(event){

    const file =
        event.target.files[0];


    if(!file)
        return;


    const reader =
        new FileReader();


    reader.onload=function(e){

        selectedImage =
            e.target.result;


        const preview =
            document
            .getElementById(
                "imagePreview"
            );


        preview.src =
            selectedImage;


        preview.style.display=
            "block";

    };


    reader.readAsDataURL(file);

}


function createPost(){

    const text =
        document
        .getElementById("postText")
        .value
        .trim();


    if(
        !text &&
        !selectedImage
    ){

        alert(
            "Write something or add an image."
        );

        return;

    }


    let posts =
        getData(POSTS);


    posts.unshift({

        id:Date.now(),

        userId:
            currentUser.id,

        text:text,

        image:
            selectedImage,

        likes:[],

        comments:[]

    });


    saveData(
        POSTS,
        posts
    );


    document
    .getElementById("postText")
    .value="";


    document
    .getElementById("postImage")
    .value="";


    document
    .getElementById("imagePreview")
    .style.display="none";


    selectedImage="";


    showToast(
        "Post published!"
    );


    loadFeed();

    openPage("home");

}


/* =====================================================
   FEED
===================================================== */

function loadFeed(){

    const feed =
        document
        .getElementById("feed");


    const posts =
        getData(POSTS);


    feed.innerHTML="";


    if(posts.length===0){

        feed.innerHTML=
        `<div class="card">
            No posts yet.
        </div>`;

        return;

    }


    posts.forEach(post=>{

        const user =
            getUser(post.userId);


        if(!post.likes)
            post.likes=[];


        if(!post.comments)
            post.comments=[];


        const liked =
            post.likes.includes(
                currentUser.id
            );


        let commentsHTML="";


        post.comments.forEach(c=>{

            commentsHTML += `

            <div class="comment">

                <b>
                    ${escapeHTML(c.name)}
                </b>

                ${escapeHTML(c.text)}

            </div>

            `;

        });


        feed.innerHTML += `

        <div class="card">

            <div class="post-head">

                <div class="post-user-area">

                    <div class="post-avatar">

                        ${user
                        ?user.name.charAt(0).toUpperCase()
                        :"U"}

                    </div>

                    <div>

                        <div class="post-user">

                            ${escapeHTML(
                                user
                                ?user.name
                                :"User"
                            )}

                        </div>

                        <div class="post-time">

                            tru community

                        </div>

                    </div>

                </div>

            </div>


            ${
                post.text
                ?
                `<div class="post-text">
                    ${escapeHTML(post.text)}
                </div>`
                :
                ""
            }


            ${
                post.image
                ?
                `<img
                    src="${post.image}"
                    class="post-image"
                >`
                :
                ""
            }


            <div class="post-actions">

                <button
                    class="small-btn"
                    onclick="likePost(${post.id})">

                    ${liked?"❤️":"♡"}

                    ${post.likes.length}

                </button>


                <button
                    class="small-btn">

                    💬
                    ${post.comments.length}

                </button>


                <button
                    class="small-btn"
                    onclick="reportPost(${post.id})">

                    🚩 Report

                </button>

            </div>


            <div>

                ${commentsHTML}

            </div>


            <div class="comment-box">

                <input
                    id="comment-${post.id}"
                    placeholder="Write a comment...">

                <button
                    class="small-btn"
                    onclick="commentPost(${post.id})">

                    Comment

                </button>

            </div>

        </div>

        `;

    });


    saveData(
        POSTS,
        posts
    );

}


/* =====================================================
   LIKE
===================================================== */

function likePost(id){

    let posts =
        getData(POSTS);


    const post =
        posts.find(
            p=>p.id===id
        );


    if(!post.likes)
        post.likes=[];


    const index =
        post.likes.indexOf(
            currentUser.id
        );


    if(index===-1){

        post.likes.push(
            currentUser.id
        );

    }
    else{

        post.likes.splice(
            index,
            1
        );

    }


    saveData(
        POSTS,
        posts
    );


    loadFeed();

}


/* =====================================================
   COMMENT
===================================================== */

function commentPost(id){

    const input =
        document
        .getElementById(
            "comment-"+id
        );


    const text =
        input.value.trim();


    if(!text)
        return;


    let posts =
        getData(POSTS);


    const post =
        posts.find(
            p=>p.id===id
        );


    if(!post.comments)
        post.comments=[];


    post.comments.push({

        name:
            currentUser.name,

        text:text

    });


    saveData(
        POSTS,
        posts
    );


    loadFeed();

}


/* =====================================================
   REPORT
===================================================== */

function reportPost(id){

    let reports =
        getData(REPORTS);


    reports.push({

        postId:id,

        userId:
            currentUser.id,

        time:
            new Date().toLocaleString()

    });


    saveData(
        REPORTS,
        reports
    );


    showToast(
        "Post reported."
    );

}


/* =====================================================
   FRIENDS
===================================================== */

function getUser(id){

    return getData(USERS)
    .find(
        u=>u.id===id
    );

}


function areFriends(a,b){

    const friends =
        getData(FRIENDS);


    return friends.some(
        f=>
        (
            f.user1===a &&
            f.user2===b
        )
        ||
        (
            f.user1===b &&
            f.user2===a
        )
    );

}


function requestSent(a,b){

    const requests =
        getData(REQUESTS);


    return requests.some(
        r=>
        r.from===a &&
        r.to===b
    );

}


function sendFriendRequest(id){

    if(
        areFriends(
            currentUser.id,
            id
        )
    ){

        showToast(
            "Already friends."
        );

        return;

    }


    if(
        requestSent(
            currentUser.id,
            id
        )
    ){

        showToast(
            "Request already sent."
        );

        return;

    }


    let requests =
        getData(REQUESTS);


    requests.push({

        from:
            currentUser.id,

        to:id

    });


    saveData(
        REQUESTS,
        requests
    );


    showToast(
        "Friend request sent!"
    );


    loadFriends();

}


/* =====================================================
   LOAD FRIENDS
===================================================== */

function loadFriends(){

    const users =
        getData(USERS);


    const friends =
        getData(FRIENDS);


    const myFriendIds =
        friends
        .filter(
            f=>
            f.user1===currentUser.id ||
            f.user2===currentUser.id
        )
        .map(
            f=>
            f.user1===currentUser.id
            ?f.user2
            :f.user1
        );


    const suggestionBox =
        document
        .getElementById(
            "suggestionList"
        );


    const friendBox =
        document
        .getElementById(
            "friendList"
        );


    suggestionBox.innerHTML="";


    const suggestions =
        users
        .filter(
            u=>
            u.id!==currentUser.id &&
            u.role!=="admin" &&
            !myFriendIds.includes(u.id) &&
            !requestSent(
                currentUser.id,
                u.id
            )
        )
        .slice(0,8);


    suggestions.forEach(
        user=>{

            suggestionBox.innerHTML +=
            createFriendCard(
                user,
                false
            );

        }
    );


    if(suggestions.length===0){

        suggestionBox.innerHTML=
        `<p style="color:#777">
        No new suggestions right now.
        </p>`;

    }


    friendBox.innerHTML="";


    const myFriends =
        users.filter(
            u=>
            myFriendIds.includes(
                u.id
            )
        );


    myFriends.forEach(
        user=>{

            friendBox.innerHTML +=
            createFriendCard(
                user,
                true
            );

        }
    );


    if(myFriends.length===0){

        friendBox.innerHTML=
        `<p style="color:#777">
        You have no friends yet.
        Add someone from the suggestions above.
        </p>`;

    }

}


function createFriendCard(
    user,
    isFriend
){

    return `

    <div class="friend-card">

        <div class="friend-avatar">

            ${user.name
            .charAt(0)
            .toUpperCase()}

        </div>


        <h3>
            ${escapeHTML(
                user.name
            )}
        </h3>


        <p>
            ${escapeHTML(
                user.bio ||
                "tru community member"
            )}
        </p>


        ${
            isFriend
            ?
            `<button
                class="friend-btn message-btn"
                onclick="startChat('${user.id}')">

                💬 Message

            </button>`
            :
            `<button
                class="friend-btn"
                onclick="sendFriendRequest('${user.id}')">

                ➕ Add Friend

            </button>`
        }

    </div>

    `;

}


/* =====================================================
   REQUESTS
===================================================== */

function loadRequests(){

    const box =
        document
        .getElementById(
            "requestsList"
        );


    const requests =
        getData(REQUESTS);


    const mine =
        requests.filter(
            r=>
            r.to===currentUser.id
        );


    box.innerHTML="";


    if(mine.length===0){

        box.innerHTML=
        `<p style="color:#777">
        No new friend requests.
        </p>`;

        return;

    }


    mine.forEach(
        request=>{

            const user =
                getUser(
                    request.from
                );


            const index =
                requests.indexOf(
                    request
                );


            box.innerHTML += `

            <div class="request-card">

                <div>

                    <b>
                        ${escapeHTML(
                            user.name
                        )}
                    </b>

                    <div
                    style="
                    color:#777;
                    font-size:13px;
                    margin-top:3px">

                    wants to be your friend

                    </div>

                </div>


                <div>

                    <button
                        class="small-btn"
                        onclick="acceptRequest(
                        '${request.from}',
                        ${index}
                        )">

                        Accept

                    </button>


                    <button
                        class="small-btn"
                        onclick="rejectRequest(
                        ${index}
                        )">

                        Ignore

                    </button>

                </div>

            </div>

            `;

        }
    );

}


function acceptRequest(
    from,
    index
){

    let requests =
        getData(REQUESTS);


    let friends =
        getData(FRIENDS);


    if(
        !areFriends(
            currentUser.id,
            from
        )
    ){

        friends.push({

            user1:
                currentUser.id,

            user2:
                from

        });

    }


    requests.splice(
        index,
        1
    );


    saveData(
        FRIENDS,
        friends
    );


    saveData(
        REQUESTS,
        requests
    );


    loadFriends();

    loadRequests();

    loadChatUsers();


    showToast(
        "Friend added!"
    );

}


function rejectRequest(index){

    let requests =
        getData(REQUESTS);


    requests.splice(
        index,
        1
    );


    saveData(
        REQUESTS,
        requests
    );


    loadRequests();

}


/* =====================================================
   CHAT
===================================================== */

function loadChatUsers(){

    const box =
        document
        .getElementById(
            "chatUsers"
        );


    const users =
        getData(USERS);


    const friends =
        getData(FRIENDS);


    const ids =
        friends
        .filter(
            f=>
            f.user1===currentUser.id ||
            f.user2===currentUser.id
        )
        .map(
            f=>
            f.user1===currentUser.id
            ?f.user2
            :f.user1
        );


    const myFriends =
        users.filter(
            u=>
            ids.includes(
                u.id
            )
        );


    box.innerHTML="";


    if(myFriends.length===0){

        box.innerHTML=
        `<div style="padding:15px;color:#777">
        Add friends to start chatting.
        </div>`;

        return;

    }


    myFriends.forEach(
        user=>{

            box.innerHTML += `

            <div
                class="chat-user"
                onclick="startChat('${user.id}')">

                <b>
                    ${escapeHTML(
                        user.name
                    )}
                </b>

                <div
                style="
                font-size:12px;
                color:#777;
                margin-top:3px">

                ${escapeHTML(
                    user.bio || "Friend"
                )}

                </div>

            </div>

            `;

        }
    );

}


function startChat(id){

    selectedFriend=id;


    openPage("chat");


    const user =
        getUser(id);


    if(!user)
        return;


    document
    .getElementById(
        "chatHeader"
    )
    .textContent=
        "💬 Chat with "+
        user.name;


    loadChatMessages();

}


function loadChatMessages(){

    if(!selectedFriend)
        return;


    const box =
        document
        .getElementById(
            "chatMessages"
        );


    const messages =
        getData(MESSAGES);


    const chat =
        messages.filter(
            m=>
            (
                m.from===currentUser.id &&
                m.to===selectedFriend
            )
            ||
            (
                m.from===selectedFriend &&
                m.to===currentUser.id
            )
        );


    box.innerHTML="";


    if(chat.length===0){

        box.innerHTML=
        `<div
        style="
        text-align:center;
        color:#999;
        padding:40px">

        Say hello 👋

        </div>`;

        return;

    }


    chat.forEach(message=>{

        box.innerHTML += `

        <div
        class="
        chat-message
        ${message.from===currentUser.id
        ?"mine":""}">

        ${escapeHTML(
            message.text
        )}

        </div>

        `;

    });


    box.scrollTop=
        box.scrollHeight;

}


function sendChat(){

    if(!selectedFriend){

        alert(
            "Select a friend first."
        );

        return;

    }


    const input =
        document
        .getElementById(
            "chatInput"
        );


    const text =
        input.value.trim();


    if(!text)
        return;


    let messages =
        getData(MESSAGES);


    messages.push({

        from:
            currentUser.id,

        to:
            selectedFriend,

        text:text,

        time:
            new Date().toLocaleTimeString()

    });


    saveData(
        MESSAGES,
        messages
    );


    input.value="";


    loadChatMessages();

}


/* =====================================================
   SEARCH
===================================================== */

function searchContent(){

    const query =
        document
        .getElementById(
            "searchInput"
        )
        .value
        .trim()
        .toLowerCase();


    const box =
        document
        .getElementById(
            "searchResults"
        );


    if(!query){

        box.innerHTML=
        `<div class="card">
        Type something to search.
        </div>`;

        return;

    }


    const users =
        getData(USERS);


    const posts =
        getData(POSTS);


    const userResults =
        users.filter(
            u=>
            u.name
            .toLowerCase()
            .includes(query)
        );


    const postResults =
        posts.filter(
            p=>
            p.text
            .toLowerCase()
            .includes(query)
        );


    box.innerHTML="";


    userResults.forEach(
        user=>{

            if(
                user.id===currentUser.id
            )
                return;


            box.innerHTML += `

            <div class="card">

                <div
                class="post-user-area">

                    <div
                    class="post-avatar">

                    ${user.name
                    .charAt(0)
                    .toUpperCase()}

                    </div>

                    <div>

                        <b>
                            ${escapeHTML(
                                user.name
                            )}
                        </b>

                        <p
                        style="
                        color:#777;
                        font-size:13px;
                        margin-top:4px">

                        ${escapeHTML(
                            user.bio || "tru user"
                        )}

                        </p>

                    </div>

                </div>

            </div>

            `;

        }
    );


    postResults.forEach(
        post=>{

            box.innerHTML += `

            <div class="card">

                <b>
                    ${escapeHTML(
                        getUserName(
                            post.userId
                        )
                    )}
                </b>

                <p style="margin-top:8px">

                    ${escapeHTML(
                        post.text
                    )}

                </p>

            </div>

            `;

        }
    );


    if(!box.innerHTML){

        box.innerHTML=
        `<div class="card">
        No results found.
        </div>`;

    }

}


