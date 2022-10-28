const buttonClick = document.getElementById("button-add");
const listeeClass = document.querySelector("#input-field-name");
let addButton = document.getElementById("button-incr");
let remButton = document.getElementById("button-decr");
let counter = document.getElementById("input-field-teams");
let count = 0;
const assignMember = document.getElementById("assign-member");
const resetButton = document.getElementById("reset");

const buttonAdd = () => {
    counter.value = ++count;
}

const buttonRemove = () => {
    if (count >= 1) {
    counter.value = --count;
    }
}

addButton.addEventListener('click', buttonAdd);
remButton.addEventListener('click', buttonRemove);

const addListItem = function() {
    const unorderedList = document.querySelector(".listee");
    const newListItem = document.createElement("li");
    newListItem.style.fontSize = "18px";
    newListItem.style.backgroundColor = "white";
    newListItem.style.borderBottomColor = "gray";
    newListItem.innerText = listeeClass.value;
    newListItem.classList.add("list-item");
    unorderedList.appendChild(newListItem);
    listeeClass.value = "";
}

const addTeam = () => {
    const teamList = document.querySelector(".teams-list");
    const newTeam = document.createElement("ul");
    let counterNumber = parseInt(counter.value);
    newTeam.innerText = "Team" + " " + counterNumber;
    newTeam.classList.add("new-team");
    newTeam.style.paddingBottom = "10px";
    newTeam.style.paddingRight = "30px";
    teamList.appendChild(newTeam);
}

const assignMemberToTeam = () => {
    const teamList = document.querySelector(".new-team");
    const unorderedList = document.querySelector(".listee");
    const newTeamItem = document.createElement("span");
    newTeamItem.innerText = unorderedList.lastChild.innerText;
    teamList.appendChild(newTeamItem);
    newTeamItem.classList.add("list-of-names");
}


assignMember.addEventListener('click', assignMemberToTeam);

// const removeTeam = () => {
//     const teamList = document.querySelector(".teams-list");
//     const item = teamList.lastChild;
//     delete item;
// }

addButton.addEventListener('click', addTeam);
// remButton.addEventListener('click', removeTeam);



buttonClick.addEventListener('click', addListItem);
listeeClass.addEventListener('keyup', function(event) {
    if (event.which === 13) {
        addListItem();
    }
})