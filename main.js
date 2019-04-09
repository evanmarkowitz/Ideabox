var saveButton = document.querySelector('.save-button');
var cardSection = document.querySelector('section');
var upVoteButton = document.querySelector('.quality-up-img');
var newQualityButton = document.querySelector(".add-new-qual-btn");
var ideas = [];
var searchBar = document.querySelector('.search-input');
var filterBtn = document.querySelector('.search-button');


window.addEventListener('load', pageLoad);
cardSection.addEventListener("click", deleteCard);
titleInput.addEventListener("input", disableSaveBtn);
window.addEventListener('load', pageLoad)
cardSection.addEventListener('click', findId);
saveButton.addEventListener('click', makeNewIdea);
cardSection.addEventListener("click", deleteCard);
newQualityButton.addEventListener('click', addQuality);
cardSection.addEventListener('input', editOfBody)
cardSection.addEventListener('input', editOfTitle)
cardSection.addEventListener("click", ideaAttributeChange);


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
function pageLoad(e) {
  qualityRetrieve();
  var retrievedIdeas = localStorage.getItem('ideas')
  var parsedIdeas = JSON.parse(retrievedIdeas);
  for (var i = 0; i < parsedIdeas.length; i++ ) {
  var bestIdea = new Idea(parsedIdeas[i].id, parsedIdeas[i].title, parsedIdeas[i].body, parsedIdeas[i].quality, parsedIdeas[i].starred);
  console.log(parsedIdeas[i].starred);
  saveNewIdea(bestIdea)
  ideas.push(bestIdea)
  bestIdea.saveToLocalStorage()
  applyStar(e);
  }
  displayAllCards();
}


function saveNewIdea(obj) {
  var ideaTable = document.querySelector('section');
  ideaTable.innerHTML = `<article class="card" data-id="${obj.id}">
      <header class="idea-header">
        <img class="fave-img" src="images/star.svg">
        <img class="delete-img" src="images/delete.svg">
      </header>
      <div class="idea-content">
        <h5 contenteditable="true" class="idea-card-title">${obj.title}</h5>
        <p contenteditable="true" class="idea-card-body">${obj.body}</p>
      </div>
      <footer class="idea-footer">
        <img class="quality-up-img" src="images/upvote-active.svg">
        <h5 class="idea-card-quality">Quality:<span id="idea-card-quality"> ${obj.quality}</span></h5>
        <img class="quality-down-img" src="images/downvote.svg">
      </footer>
    </article>` + ideaTable.innerHTML;
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

  function deleteCard(e) {
    if(e.target.className === "delete-img") {
      e.target.closest(".card").remove();
      var ideaLocation = findId(e)
    ideas[ideaLocation].deleteFromStorage(ideaLocation);
    saveLocalIdeas()
    }
  }

  function ideaAttributeChange(e) {
    var ideaLocation = findId(e);
    if(e.target.className === "quality-up-img") {
      ideas[ideaLocation].upVote();
      var qualitySpan = e.target.parentNode.childNodes[3].childNodes[1]
      qualitySpan.innerText = " " + ideas[ideaLocation].quality;
  } else if (e.target.className === "quality-down-img") {
      ideas[ideaLocation].downVote();
      var qualitySpan = e.target.parentNode.childNodes[3].childNodes[1]
      qualitySpan.innerText = " " + ideas[ideaLocation].quality;
  } else  if(e.target.className === "fave-img") {
      ideas[ideaLocation].isStarred();
      toggleStar(e);
    }
  ideas[ideaLocation].saveToLocalStorage()
  }

  function editOfBody(e) {
  if(e.target.className === "idea-card-body"){
    var ideaLocation = findId(e);
    ideas[ideaLocation].body = e.target.innerText
    ideas[ideaLocation].saveToLocalStorage();
    }
}
function editOfTitle(e) {
  if(e.target.className === "idea-card-title"){
    var ideaLocation = findId(e);
    ideas[ideaLocation].title = e.target.innerText
    ideas[ideaLocation].saveToLocalStorage();
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

// Favorite status functions 

var showStarredIdeasButton = document.querySelector('.light-btn');

showStarredIdeasButton.addEventListener('click', toggleStarFilter)

function toggleStarFilter() {
  for (var i = 0; i < ideas.length; i++) {
    var dataIdKey = `[data-id = "${ideas[i].id}"]`;
    var targetCard = document.querySelector(dataIdKey);
    var toggle = 0;
    if (targetCard.style.display === 'block') {
      if (ideas[i].starred) {
        targetCard.style.display = 'block';
      } else if (ideas[i].starred === false) {
        targetCard.style.display = 'none';
      }
    } 
    else if (targetCard.style.display === 'none') {
      targetCard.style.display = 'block';
    }
  }
}

function applyStar(e) {
  for (var i =0; i < ideas.length; i++) {
    if (ideas[i].starred) {
      document.querySelectorAll('article')[i].childNodes[1].childNodes[1].src = 'images/star-active.svg';
    } else if (ideas[i].starred === false) {
      document.querySelectorAll('article')[i].childNodes[1].childNodes[1].src = 'images/star.svg';
    }
  }
}

function toggleStar(e) {
  if (e.target.className === 'fave-img') {
    // e.target.parentNode.childNodes[1] = 
    console.log(e.target.parentNode.childNodes[1].src);
    var ideaLocation = findId(e);
    if (ideas[ideaLocation].starred) {
      e.target.parentNode.childNodes[1].src = 'images/star-active.svg';
    } else if (ideas[ideaLocation].starred === false) {
      e.target.parentNode.childNodes[1].src = 'images/star.svg';
    }
  }
}

// Quality Form functions

var qualityForm = document.querySelector('.quality-btn-form');
qualityForm.addEventListener('click', toggleButtonColor);

function toggleButtonColor(event) {
  var swillButton = document.querySelector('#swill-btn');
  var plausButton = document.querySelector('#plausible-btn');
  var geniusButton = document.querySelector('#genius-btn');
  var qualityButtonClass = document.querySelector('.filter-btn');
  var qTargetId = event.target.id;
  var qTargetBtn = document.getElementById(qTargetId);
  if (event.target.className == 'filter-btn') {
    swillButton.className = 'filter-btn';
    plausButton.className = 'filter-btn';
    geniusButton.className = 'filter-btn';
    qTargetBtn.className = 'highlight-btn';
  } else if (event.target.className == 'highlight-btn') {
    qTargetBtn.className = 'filter-btn';
  }
}


function displayAllCards() {
  for (var i = 0; i < ideas.length; i++) {
    var dataIdKey = `[data-id = "${ideas[i].id}"]`;
    var targetCard = document.querySelector(dataIdKey);
    targetCard.style.display = "block";
  }
}

//SEARCH BOX FILTER

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


function toggleQualityFilterNew(e) {
  displayAllCards();
  var currentDisplay = 0;
  for (var i = 0; i < ideas.length; i++) {
  var dataIdKey = `[data-id = "${ideas[i].id}"]`;
  var targetCard = document.querySelector(dataIdKey);
    if (e.target.className === 'filter-btn') {
    displayAllCards();
    } else if (ideas[i].quality.toLowerCase().includes(e.target.innerText.toLowerCase())) {
    console.log('running if');
    targetCard.style.display = "block";
    currentDisplay = e.target.innerText;
  } else if (e.target.className === "quality-btn-form"){
    displayAllCards();
  } else {
    targetCard.style.display = "none";
  }}}

 

qualityForm.addEventListener('click', toggleQualityFilterNew);

function addQuality(e) {
    var newQuality = document.querySelector(".new-quality-input")
    var qualityForm = document.querySelector(".quality-btn-form")
    qualityForm.insertAdjacentHTML('beforeend', `<button type="button" class="filter-btn">${newQuality.value}</button>`);
    quality.push(newQuality.value)
    var stringifiedQuality = JSON.stringify(quality)
    localStorage.setItem('quality', stringifiedQuality) 
}
function qualityRetrieve() {
  var retrievedQuality = localStorage.getItem('quality')
  var parsedQuality = JSON.parse(retrievedQuality)
  if(parsedQuality === null|| parsedQuality.length === 0 ){
  } else {
    quality = parsedQuality;}
  for (var i = 0; i < quality.length; i++){
  var qualityForm = document.querySelector('.quality-btn-form')
  qualityForm.innerHTML +=(`<button type="button" id ="${quality[i]}-btn" class="filter-btn">${quality[i].charAt(0).toUpperCase()+quality[i].slice(1)}</button>`)}
}
var newQualityButton = document.querySelector(".add-new-qual-btn")

// newQualityButton.addEventListener('click', addQuality);




// function applySwillFilter() {
//   for (var i = 0; i < ideas.length; i++) {
//     var swillButton = document.querySelector('#swill-btn');
//     var dataIdKey = `[data-id = "${ideas[i].id}"]`;
//     var targetCard = document.querySelector(dataIdKey);
//     if (ideas[i].quality === 'swill' && targetCard.style.display !== 'block') {
//       console.log('running if');
//       targetCard.style.display = "block";
//     } else if (ideas[i].quality !== 'swill' && targetCard.style.display !== 'none') {
//       console.log('running else');
//       targetCard.style.display = "none";
//       }
//   }
// }




// function applyPlausibleFilter() {
//   for (var i = 0; i < ideas.length; i++) {
//     var plausButton = document.querySelector('#plausible-btn');
//     var dataIdKey = `[data-id = "${ideas[i].id}"]`;
//     var targetCard = document.querySelector(dataIdKey);
//     if (ideas[i].quality === 'plausible' && targetCard.style.display !== 'block') {
//       console.log('running if');
//       targetCard.style.display = "block";
//     } else if (ideas[i].quality !== 'plausible' && targetCard.style.display !== 'none') {
//       console.log('running else');
//       targetCard.style.display = "none";
//     }
//   }
// }




// qualityForm.addEventListener('click', toggleQualityFilter);

// function filterSelector(e) {
//    if (e.target.className === 'filter-btn') {
//     displayAllCards();
//   }
//   else if (e.target.className === 'filter-btn') {
//     displayAllCards();
//   } else if (e.target.className === 'highlight-btn') {
//       if (e.target.id === 'swill-btn') {
//       toggleQualityFilter(0);
//       } else if (e.target.id === 'plausible-btn') {
//           console.log('plaus');
//           toggleQualityFilter(1);
//         } else if (e.target.id === 'genius-btn') {
//             console.log('genius');
//             toggleQualityFilter(2);
//   //         }
//   for (var i = 0; i < quality.length; i++) {
//       toggleQualityFilter[i]
//   }
// }}


// function toggleQualityFilter(target) {
//     displayAllCards();
//   for (var i = 0; i < ideas.length; i++) {
//     var swillButton = document.querySelector('#swill-btn');
//     var plausButton = document.querySelector('#plausible-btn');
//     var geniusButton = document.querySelector('#genius-btn');
//     var selectedQuality = ['swill', 'plausible', 'genius'];
//     var dataIdKey = `[data-id = "${ideas[i].id}"]`;
//     var targetCard = document.querySelector(dataIdKey);
//     if (ideas[i].quality.toLowerCase().includes(selectedQuality[target]quality.toLowerCase()) === false) {
//       console.log('running if');
//       targetCard.style.display = "none";
//     } else if (ideas[i].body.toLowerCase().includes(selectedQuality[target]quality.toLowerCase()) === true) {
//       console.log('running else');
//       targetCard.style.display = "block";
//     }
//   }}

  // function deleteCard(e) {
  //   if(e.target.className === "delete-img") {
  //     e.target.closest(".card").remove();
  //   } 
  //   if (e.target.className === "delete-img") {
  //   var ideaLocation = findId(e)
  //   ideas[ideaLocation].deleteFromStorage(ideaLocation);
  //   saveLocalIdeas()}
  // }


// function upVote(e) {
//     if(e.target.className === "quality-up-img") {
//       var ideaLocation = findId(e);
//       ideas[ideaLocation].upVote();
//       ideas[ideaLocation].saveToLocalStorage()
//       var qualitySpan = e.target.parentNode.childNodes[3].childNodes[1]
//       qualitySpan.innerText = " " + ideas[ideaLocation].quality;
//     }

//   }
//   function downVote(e) {
//     if(e.target.className === "quality-down-img") {
//       var ideaLocation = findId(e);
//       ideas[ideaLocation].downVote();
//       ideas[ideaLocation].saveToLocalStorage()
//       var qualitySpan = e.target.parentNode.childNodes[3].childNodes[1]
//       qualitySpan.innerText = " " + ideas[ideaLocation].quality;
//     }
//   }

//   function starred(e) {
//     if(e.target.className === "fave-img") {
//       var ideaLocation = findId(e);
//       console.log(ideas[ideaLocation])
//       ideas[ideaLocation].isStarred();
//       ideas[ideaLocation].saveToLocalStorage()
//     }
//   }
// cardSection.addEventListener("click", upVote);
// cardSection.addEventListener("click", downVote);
// cardSection.addEventListener("click", starred);
// saveButton.addEventListener('click', saveIdea);
