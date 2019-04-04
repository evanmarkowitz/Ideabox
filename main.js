var saveButton = document.querySelector('.save-button');
var cardSection = document.querySelector(".card-section")
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
  saveNewIdea(bestIdea);
  ideas.push(bestIdea);
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
  for (var i = 0; i < parsedIdeas.length; i++ ) {
  var bestIdea = new Idea(parsedIdeas[i].id, parsedIdeas[i].title, parsedIdeas[i].body);
  saveNewIdea(bestIdea)
  ideas.push(bestIdea)
  }
}

window.addEventListener('load', pageLoad)


function saveNewIdea(obj) {
  var ideaTable = document.querySelector('section');
  ideaTable.innerHTML += `<article class="card" data-id="${obj.id}">
      <header class="idea-header">
        <img class="fave-img" src="images/star.svg">
        <img class="delete-img" src="images/delete.svg">
      </header>
      <div class="idea-content">
        <h5 class="idea-card-title">${obj.title}</h5>
        <p class="idea-card-body">${obj.body}</p>
      </div>
      <footer class="idea-footer">
        <img class="quality-up-img" src="images/upvote-active.svg">
        <h5 class="idea-card-quality">Quality:${obj.quality}</h5>
        <img class="quality-down-img" src="images/downvote.svg">
      </footer>
    </article>`
  }

  function deleteCard(e) {
    if(e.target.className === "delete-img") {
      e.target.closest(".card").remove();
    } 

  }

 

  cardSection.addEventListener("click", deleteCard)