var saveButton = document.querySelector('.save-button');
var cardSection = document.querySelector('section');
var upVoteButton = document.querySelector('.quality-up-img')
var ideas = [];


window.addEventListener('load', pageLoad)
cardSection.addEventListener('click', findId);
saveButton.addEventListener('click', saveIdea);
cardSection.addEventListener("click", deleteCard);
cardSection.addEventListener("click", upVote);
cardSection.addEventListener("click", downVote);
cardSection.addEventListener("click", starred);

function saveIdea(e) {
  makeNewIdea();
  saveLocalIdeas(); 
}

// Creates New Idea and Pushes it To Ideas Array
function makeNewIdea() {
  var bestIdea = new Idea(Date.now(), titleInput.value, bodyInput.value, quality[0], false);
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
  var parsedIdeas = JSON.parse(retrievedIdeas);
  for (var i = 0; i < parsedIdeas.length; i++ ) {
  var bestIdea = new Idea(parsedIdeas[i].id, parsedIdeas[i].title, parsedIdeas[i].body, parsedIdeas[i].quality, false);
  saveNewIdea(bestIdea)
  ideas.push(bestIdea)
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
        <h5 class="idea-card-quality">Quality: ${obj.quality}</h5>
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

// The save button should be disabled unless there is text within the input
  saveButton.addEventListener("click", function(e) {
    console.log(titleInput.value);
    console.log(bodyInput.value);
    if (titleInput.value === "" || null && bodyInput.value === "" || null) {
      saveButton.disabled = true;
      saveButton.style.backgroundcolor = "#A9AAD2";
      alert("Please enter an Idea");
    }
  });

  // function deleteCard(e) {
  //   if(e.target.className === "delete-img") {
  //     e.target.closest(".card").remove();
  //   } 
  //   if (e.target.className === "delete-img") {
  //   var ideaLocation = findId(e)
  //   ideas[ideaLocation].deleteFromStorage(ideaLocation);
  //   saveLocalIdeas()}
  // }

  function deleteCard(e) {
    if(e.target.className === "delete-img") {
      e.target.closest(".card").remove();
      var ideaLocation = findId(e)
    ideas[ideaLocation].deleteFromStorage(ideaLocation);
    saveLocalIdeas()
    }
  }





  function upVote(e) {
    if(e.target.className === "quality-up-img") {
      var ideaLocation = findId(e);
      ideas[ideaLocation].upVote();
      saveLocalIdeas();
    }
  }
  function downVote(e) {
    if(e.target.className === "quality-down-img") {
      var ideaLocation = findId(e);
      ideas[ideaLocation].downVote();
      saveLocalIdeas();
    }
  }
  function starred(e) {
    if(e.target.className === "fave-img") {
      var ideaLocation = findId(e);
      console.log(ideas[ideaLocation])
      ideas[ideaLocation].isStarred();
      saveLocalIdeas();
    }
  }



 



  cardSection.addEventListener("click", deleteCard)


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





var searchBoxInput = document.querySelector('.search-input');

searchBoxInput.addEventListener('keyup', ideaFilter);

function ideaFilter() {
  for (var i = 0; i < ideas.length; i++) {
    var dataIdKey = `[data-id = "${ideas[i].id}"]`;
    var targetCard = document.querySelector(dataIdKey);
    if (ideas[i].body.toLowerCase().includes(searchBoxInput.value.toLowerCase()) === true || ideas[i].title.toLowerCase().includes(searchBoxInput.value.toLowerCase()) === true) {
      console.log('running if');
      targetCard.style.display = "block";
    } else if (ideas[i].body.toLowerCase().includes(searchBoxInput.value.toLowerCase()) === false || ideas[i].title.toLowerCase().includes(searchBoxInput.value.toLowerCase()) === false) {
      console.log('running else');
      targetCard.style.display = "none";
    }
  }
}






