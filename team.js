// STOP UNDOING HERE!

class Member {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }
}

class Team {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.members = [];
  }

  addMember(member) {
    this.members.push(member);
  }

  deleteMember(member) {
    // console.log('inside deleteMember function')
    // find the index of the member inside the members array 
    let index = this.members.indexOf(member);
    // removes one element passed in above
    this.members.splice(index, 1);
  }
}

// array of teams, use the data to render new HTML to DOM in browser
let teams = [];
let teamId = 0;


// buttons could be optimized
// instantiating an instance of the team and pushing to the array, returns current id and increments for the next time it's called, getValue is the new team name
onClick('new-team', () => {
  // console.log('inside new team')
  teams.push(new Team(teamId++, getValue('new-team-name')));
  // after the new team is called, iterates over the array and builds a table for each
  drawDOM();
});

// take the id of the element and pass in an action (that will happen on the on-click)
function onClick(id, action) {
  let element = document.getElementById(id);
  element.addEventListener('click', action);
  // need to keep a reference to the element so it is returned
  return element;
}

// takes an id, returns that element and its value
function getValue(id) {
  return document.getElementById(id).value;
}

function drawDOM() {
  // gets the div we're adding the teams to
  let teamDiv = document.getElementById('teams');
  // clears the div in preparation to add new info
  clearElement(teamDiv);
  // draw the team to the team div
  // iterates over the team
  for (team of teams) {
    // takes an instance of the team class
    let table = createTeamTable(team);
    let title = document.createElement('h2');
    // building the title data based on the data iin the name class
    title.innerHTML = team.name;
    // title.appendChild(createEditTeamButton(team));
    title.appendChild(createDeleteTeamButton(team));
    teamDiv.appendChild(title);
    teamDiv.appendChild(table);
    // need to add each member
    for (member of team.members) {
      createMemberRow(team, table, member);
    }
  }
}

function createMemberRow(team, table, member) {
  // the table that's been passed in, start at position 2 because other rows are already filled in
  let row = table.insertRow(2);
  row.insertCell(0).innerHTML = member.name;
  row.insertCell(1).innerHTML = member.position;
  let actions = row.insertCell(2);
  actions.appendChild(createDeleteRowButton(team, member));
}

// removes the member and redraws the data
function createDeleteRowButton(team, member) {
  let btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.innerHTML = 'Delete';
  btn.onclick = () => {
    let index = team.members.indexOf(member);
    team.members.splice(index, 1);
    drawDOM();
  };
  return btn;
}

// removes a team from the teams array and re-renders the DOM
function createDeleteTeamButton(team) {
  let btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.innerHTML = 'Delete Team';
  // console.log('before the on click fx');
  // console.log(btn)
  btn.onclick = () => {
    // console.log('inside delete team button');
    let index = teams.indexOf(team);
    teams.splice(index, 1);
    drawDOM();
  };
  // need to return the button in order to append button on row and table levels
  return btn;
}

function createNewMemberButton(team) {
  let btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.innerHTML = 'Create';
  btn.onclick = () => {
    team.members.push(new Member(getValue(`name-input-${team.id}`), getValue(`position-input-${team.id}`)));
    drawDOM();
  };
  return btn;
}

function createTeamTable(team) {
  let table = document.createElement('table');
  table.setAttribute('class', 'table table-dark table-striped');
  let row = table.insertRow(0);
  let nameColumn = document.createElement('th');
  let positionColumn = document.createElement('th');
  nameColumn.innerHTML = 'Name';
  positionColumn.innerHTML = 'Position';
  row.appendChild(nameColumn);
  row.appendChild(positionColumn);
  let formRow = table.insertRow(1);
  let nameTh = document.createElement('th');
  let positionTh = document.createElement('th');
  let createTh = document.createElement('th');
  let nameInput = document.createElement('input');
  nameInput.setAttribute('id', `name-input-${team.id}`);
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('class', 'form-control');
  let positionInput = document.createElement('input');
  positionInput.setAttribute('id', `position-input-${team.id}`);
  positionInput.setAttribute('type', 'text');
  positionInput.setAttribute('class', 'form-control');
  let newMemberButton = createNewMemberButton(team);
  nameTh.appendChild(nameInput);
  positionTh.appendChild(positionInput);
  createTh.appendChild(newMemberButton);
  formRow.appendChild(nameTh);
  formRow.appendChild(positionTh);
  formRow.appendChild(createTh);
  return table
}

function clearElement(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}