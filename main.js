var saveButton = document.querySelector('.save-button');
var ideas = [];



saveButton.addEventListener('click', saveIdea);

function saveIdea(e) {
  // e.preventDefault();
  // console.log("first step");
  // var idea = new Idea(titleInput.value, bodyInput.value);
  // console.log(idea);
  // var stringifiedIdea = JSON.stringify(idea);
  // localStorage.setItem('idea', stringifiedIdea);
  // console.log("after storing local");
  // ideaReload();
  makeNewIdea();
  saveLocalIdeas(); 
}

// function ideaReload() {
//   var titleText = document.querySelector('#title-thing');
//   var bodyText = document.querySelector('#body-thing');
//   var parsedIdea = JSON.parse(localStorage.getItem('idea'));
//   titleText.innerText = parsedIdea.title;
//   bodyText.innerText = parsedIdea.body + parsedIdea.quality;
//   console.log(parsedIdea);

// }

// Creates New Idea and Pushes it To Ideas Array
function makeNewIdea() {
  var bestIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  ideas.push(bestIdea);
  console.log(ideas)
}

// Saves Ideas Array to Local Storage
function saveLocalIdeas() {
  var stringifiedIdeas = JSON.stringify(ideas);
  localStorage.setItem('ideas', stringifiedIdeas)
}

// // On Page Load, Retrieves from Local Storage, Makes new Instances, and then Pushes into Idea Array
function pageLoad() {
  var retrievedIdeas = localStorage.getItem('ideas')
  console.log(localStorage.getItem('ideas'));
  var parsedIdeas = JSON.parse(retrievedIdeas);
  console.log(parsedIdeas);
  for (var i = 0; i < parsedIdeas.length; i++ ) {
  var bestIdea = new Idea(parsedIdeas[i].id, parsedIdeas[i].title, parsedIdeas[i].body);
  ideas.push(bestIdea)
  console.log(ideas);
}
}

window.addEventListener('load', pageLoad)



