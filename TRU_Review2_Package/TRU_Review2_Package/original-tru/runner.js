async function loadModules(){

    const modules = [
        ["login", "authPage"],
        ["social", "moduleHost"],
        ["discover", "moduleHost"],
        ["admin", "moduleHost"]
    ];

    for(const [name, targetId] of modules){

        const response =
            await fetch(`${name}/${name}.html`);

        const html =
            await response.text();

        if(targetId === "authPage"){
            document.getElementById(targetId).innerHTML = html;
        }else{
            document.getElementById(targetId).insertAdjacentHTML(
                "beforeend",
                html
            );
        }
    }

    initialize();

    const session =
        sessionStorage.getItem("tru_session");

    if(session){

        const users = getData(USERS);

        const user =
            users.find(u=>u.email===session);

        if(user){
            currentUser = user;
            showApp();
            openPage("home");
        }

    }
}

loadModules().catch(error=>{
    console.error(error);
    alert(
        "Please run tru using VS Code Live Server. The 4 modules load together from the same project."
    );
});
