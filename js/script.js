const buttonClick = document.getElementById("button-add");
const listeeClass = document.querySelector("#input-field-name");
let addButton = document.getElementById("button-incr");
let remButton = document.getElementById("button-decr");
let counter = document.getElementById("input-field-teams");
let count = 0;
let nameList = [];
let teams = {};
const assignMember = document.getElementById("assign-member");
const resetButton = document.getElementById("reset");
const resetTeamsButton = document.getElementById("resetTeams");

// Function to increment team count
const buttonAdd = () => {
  counter.value = ++count;
  addTeam();
};

// Function to decrement team count and remove the last team
const buttonRemove = () => {
  if (count >= 1) {
    const teamNumber = `Team ${count}`;
    if (teams[teamNumber]) {
      delete teams[teamNumber];
      updateTeamsUI();
    }
    counter.value = --count;
  }
};

addButton.addEventListener("click", buttonAdd);
remButton.addEventListener("click", buttonRemove);

// Function to add a name to the list
const addListItem = () => {
  if (listeeClass.value === "") {
    return;
  }
  nameList.push(listeeClass.value.trim());
  const unorderedList = document.querySelector(".listee");
  const newListItem = document.createElement("li");
  newListItem.style.fontSize = "18px";
  newListItem.style.backgroundColor = "white";
  newListItem.style.borderBottomColor = "gray";
  newListItem.innerText = listeeClass.value;
  newListItem.classList.add("list-item");
  unorderedList.appendChild(newListItem);
  listeeClass.value = ""; // Clear the input field
};

buttonClick.addEventListener("click", addListItem);
listeeClass.addEventListener("keyup", function (event) {
  if (event.which === 13) {
    addListItem();
  }
});

// Function to add a team
const addTeam = () => {
  const counterNumber = parseInt(counter.value);
  const teamName = `Team ${counterNumber}`;
  if (!teams[teamName]) {
    teams[teamName] = [];
    updateTeamsUI();
  }
};

// Function to assign a member to a team
const assignMemberToTeam = () => {
  if (nameList.length === 0) {
    alert("No more names to assign.");
    return;
  }

  const randomNameIndex = Math.floor(Math.random() * nameList.length);
  const randomName = nameList[randomNameIndex];

  for (let team in teams) {
    if (teams[team].length < 4) { // Max of 4 members per team
      teams[team].push(randomName);
      nameList.splice(randomNameIndex, 1);

      // Remove the assigned name from the UI list
      const unorderedList = document.querySelector(".listee");
      unorderedList.children[randomNameIndex].remove();

      break;
    }
  }

  // Update the UI to reflect the assignment
  updateTeamsUI();
};

// Function to update the teams UI
function updateTeamsUI() {
  const teamListContainer = document.querySelector(".teams-list");
  teamListContainer.innerHTML = ""; // Clear existing content

  for (let team in teams) {
    const teamDiv = document.createElement("div");
    teamDiv.className = "team";
    teamDiv.innerHTML = `<strong>${team}</strong>: ${teams[team].join(", ")}`;
    teamListContainer.appendChild(teamDiv);
  }

  // Ensure the reset button is still present and correctly positioned
  if (!document.body.contains(resetTeamsButton)) {
    document.body.appendChild(resetTeamsButton);
  }
}

// Function to reset names
const resetNames = () => {
  const unorderedList = document.querySelector(".listee");
  unorderedList.innerHTML = "";
  nameList = [];
};

resetButton.addEventListener("click", resetNames);
assignMember.addEventListener("click", assignMemberToTeam);
resetTeamsButton.addEventListener('click', resetTeams);

// Function to reset teams
const resetTeams = () => {
  teams = {};
  updateTeamsUI();
};
