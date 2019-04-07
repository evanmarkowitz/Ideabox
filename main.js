var saveButton = document.querySelector('.save-button');
var cardSection = document.querySelector('section');
var upVoteButton = document.querySelector('.quality-up-img');
var ideas = [];
var searchBar = document.querySelector('.search-input');
var filterBtn = document.querySelector('.search-button');


window.addEventListener('load', pageLoad);
// saveButton.addEventListener('click', saveIdea);
cardSection.addEventListener("click", deleteCard);
titleInput.addEventListener("input", disableSaveBtn);
window.addEventListener('load', pageLoad)
cardSection.addEventListener('click', findId);
saveButton.addEventListener('click', makeNewIdea);
cardSection.addEventListener("click", deleteCard);
cardSection.addEventListener("click", upVote);
cardSection.addEventListener("click", downVote);
cardSection.addEventListener("click", starred);
filterBtn.addEventListener("click", filterSearch);
searchBar.addEventListener("keyup", searchCriteria);

// Creates New Idea and Pushes it To Ideas Array
function makeNewIdea(e) {
  var bestIdea = new Idea(Date.now(), titleInput.value, bodyInput.value, quality[0], false);
  saveNewIdea(bestIdea);
  ideas.push(bestIdea);
  bestIdea.saveToLocalStorage()
}

// Saves Ideas Array to Local Storage
function saveLocalIdeas() {
  var stringifiedIdeas = JSON.stringify(ideas);
  localStorage.setItem('ideas', stringifiedIdeas)
}

// // On Page Load, Retrieves from Local Storage, Makes new Instances, and then Pushes into Idea Array
function pageLoad() {
  var retrievedIdeas = localStorage.getItem('ideas')
  var parsedIdeas = JSON.parse(retrievedIdeas);
  for (var i = 0; i < parsedIdeas.length; i++ ) {
  var bestIdea = new Idea(parsedIdeas[i].id, parsedIdeas[i].title, parsedIdeas[i].body, parsedIdeas[i].quality, false);
  saveNewIdea(bestIdea)
  ideas.push(bestIdea)
  bestIdea.saveToLocalStorage()
  }
}


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
        <h5 class="idea-card-quality">Quality:<span id="idea-card-quality"> ${obj.quality}</span></h5>
        <img class="quality-down-img" src="images/downvote.svg">
      </footer>
    </article>`
  }
   function findId(e) {
    var targetedCard = e.target.closest(".card");
    var targetedId = parseInt(targetedCard.getAttribute('data-id'))
    var ideaLocation = ideas.findIndex(i => i.id === targetedId)
    return ideaLocation
  }

  function deleteCard(e) {
    if(e.target.className === "delete-img") {
      e.target.closest(".card").remove();
    } 
    if (e.target.className === "delete-img") {
    var ideaLocation = findId(e)
    ideas[ideaLocation].deleteFromStorage(ideaLocation);
    saveLocalIdeas()
  }}

  function upVote(e) {
    if(e.target.className === "quality-up-img") {
      var ideaLocation = findId(e);
      ideas[ideaLocation].upVote();
      ideas[ideaLocation].saveToLocalStorage()
      var quality = document.getElementById("idea-card-quality");
      quality.innerText = " " + ideas[ideaLocation].quality;
    }

  }
  function downVote(e) {
    if(e.target.className === "quality-down-img") {
      var ideaLocation = findId(e);
      ideas[ideaLocation].downVote();
      ideas[ideaLocation].saveToLocalStorage()
      var quality = document.getElementById("idea-card-quality");
      quality.innerText = " " + ideas[ideaLocation].quality;
    }
  }

  function starred(e) {
    if(e.target.className === "fave-img") {
      var ideaLocation = findId(e);
      console.log(ideas[ideaLocation])
      ideas[ideaLocation].isStarred();
      ideas[ideaLocation].saveToLocalStorage()
    }
  }


  cardSection.addEventListener("click", deleteCard)



  function disableSaveBtn() {
    if (titleInput.value != "" || null && bodyInput.value != "" || null) {
      saveButton.disabled = false;
    } else if (titleInput.value === "" || null && bodyInput.value === "" || null) {
      saveButton.disabled = true;
    }
  }


var qualityForm = document.querySelector('.quality-btn-form');
qualityForm.addEventListener('click', toggleButtonColor);

function toggleButtonColor(event) {
  var qualityButtonClass = document.querySelector('.filter-btn');
  var qTargetId = event.target.id;
  var qTargetBtn = document.getElementById(qTargetId);
  if (event.target.className == 'filter-btn') {
   qTargetBtn.className = 'highlight-btn';
  } else if (event.target.className == 'highlight-btn') {
    console.log('it is orange');
    qTargetBtn.className = 'filter-btn';
  }
}

function searchCriteria() {
  return searchBar.value;
}

function filterSearch(ideas) {
  var criteria = ideas.filter(function(idea) {
    return idea =
  }
}