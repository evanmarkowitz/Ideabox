var saveButton = document.querySelector('.save-button');
var cardSection = document.querySelector('section');
var upVoteButton = document.querySelector('.quality-up-img');
var newQualityButton = document.querySelector(".add-new-qual-btn");
var ideas = [];
var searchBar = document.querySelector('.search-input');
var filterBtn = document.querySelector('.search-button');
var menuBtn = document.querySelector('.mobile-menu-button')
var newQualityButton = document.querySelector(".add-new-qual-btn")
var nav = document.querySelector('nav');

window.addEventListener('load', pageLoad);
cardSection.addEventListener("click", deleteCard);
titleInput.addEventListener("input", disableSaveBtn);
window.addEventListener('load', pageLoad)
cardSection.addEventListener('click', findId);
saveButton.addEventListener('click', makeNewIdea);
cardSection.addEventListener("click", deleteCard);
newQualityButton.addEventListener('click', addQuality);
menuBtn.addEventListener('click', toggleNav);
cardSection.addEventListener('input', updateIdea)
cardSection.addEventListener("click", ideaAttributeChange);
saveButton.addEventListener('click', removeFirstIdea)

function makeNewIdea(e) {
  var bestIdea = new Idea(Date.now(), titleInput.value, bodyInput.value, quality[0], false);
  saveNewIdea(bestIdea);
  ideas.push(bestIdea);
  bestIdea.saveToLocalStorage()
}

function saveLocalIdeas() {
  var stringifiedIdeas = JSON.stringify(ideas);
  localStorage.setItem('ideas', stringifiedIdeas)
}

function pageLoad(e) {
  qualityRetrieve();
  var retrievedIdeas = localStorage.getItem('ideas')
  var parsedIdeas = JSON.parse(retrievedIdeas);
  for (var i = 0; i < parsedIdeas.length; i++) {
    var bestIdea = new Idea(parsedIdeas[i].id, parsedIdeas[i].title, parsedIdeas[i].body, parsedIdeas[i].quality, parsedIdeas[i].starred);
    saveNewIdea(bestIdea)
    ideas.push(bestIdea)
    bestIdea.saveToLocalStorage()
    applyStar(e);
    keepFirstIdeaRemoved()
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
        <img class="quality-up-img" src="images/upvote.svg">
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

function deleteCard(e) {
  if (e.target.className === "delete-img") {
    e.target.closest(".card").remove();
    var ideaLocation = findId(e)
    ideas[ideaLocation].deleteFromStorage(ideaLocation);
    saveLocalIdeas()
  }
}

function ideaAttributeChange(e) {
  var ideaLocation = findId(e);
  ideas[ideaLocation].updateIdeaQuality(e.target.className)
  if (e.target.className === "quality-up-img") {
    var qualitySpan = e.target.parentNode.childNodes[3].childNodes[1]
    qualitySpan.innerText = " " + ideas[ideaLocation].quality;
  } else if (e.target.className === "quality-down-img") {
    var qualitySpan = e.target.parentNode.childNodes[3].childNodes[1]
    qualitySpan.innerText = " " + ideas[ideaLocation].quality;
  } else if (e.target.className === "fave-img") {
    toggleStar(e);
  }
  ideas[ideaLocation].saveToLocalStorage()
}

function updateIdea(e) {
  var ideaLocation = findId(e);
  ideas[ideaLocation].editIdeas(e.target.className, e.target.innerText);
  ideas[ideaLocation].saveToLocalStorage();
}

cardSection.addEventListener("click", deleteCard)



function disableSaveBtn() {
  if (titleInput.value != "" || null && bodyInput.value != "" || null) {
    saveButton.disabled = false;
  } else if (titleInput.value === "" || null && bodyInput.value === "" || null) {
    saveButton.disabled = true;
  }
}

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
    } else if (targetCard.style.display === 'none') {
      targetCard.style.display = 'block';
    }
  }
}

function applyStar(e) {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].starred) {
      document.querySelectorAll('article')[i].childNodes[1].childNodes[1].src = 'images/star-active.svg';
    } else if (ideas[i].starred === false) {
      document.querySelectorAll('article')[i].childNodes[1].childNodes[1].src = 'images/star.svg';
    }
  }
}

function toggleStar(e) {
  if (e.target.className === 'fave-img') {
    var ideaLocation = findId(e);
    if (ideas[ideaLocation].starred) {
      e.target.parentNode.childNodes[1].src = 'images/star-active.svg';
    } else if (ideas[ideaLocation].starred === false) {
      e.target.parentNode.childNodes[1].src = 'images/star.svg';
    }
  }
}


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

var searchBoxInput = document.querySelector('.search-input');
searchBoxInput.addEventListener('keyup', ideaFilter);

function ideaFilter() {
  for (var i = 0; i < ideas.length; i++) {
    var dataIdKey = `[data-id = "${ideas[i].id}"]`;
    var targetCard = document.querySelector(dataIdKey);
    if (ideas[i].body.toLowerCase().includes(searchBoxInput.value.toLowerCase()) === true || ideas[i].title.toLowerCase().includes(searchBoxInput.value.toLowerCase()) === true) {
      targetCard.style.display = "block";
    } else if (ideas[i].body.toLowerCase().includes(searchBoxInput.value.toLowerCase()) === false || ideas[i].title.toLowerCase().includes(searchBoxInput.value.toLowerCase()) === false) {
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
      targetCard.style.display = "block";
      currentDisplay = e.target.innerText;
    } else if (e.target.className === "quality-btn-form") {
      displayAllCards();
    } else {
      targetCard.style.display = "none";
    }
  }
}

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
  if (parsedQuality === null || parsedQuality.length === 0) {} else {
    quality = parsedQuality;
  }
  for (var i = 0; i < quality.length; i++) {
    var qualityForm = document.querySelector('.quality-btn-form')
    qualityForm.innerHTML += (`<button type="button" id ="${quality[i]}-btn" class="filter-btn">${quality[i].charAt(0).toUpperCase()+quality[i].slice(1)}</button>`)
  }
}

function toggleNav() {
  if (nav.style.zIndex == '-5') {
    menuBtn.src = '../Ideabox/images/menu-close.svg';
    return nav.style.zIndex = '1';
  } else if (nav.style.zIndex = '1') {
    menuBtn.src = '../Ideabox/images/menu.svg';
    return nav.style.zIndex = '-5';
  }
}

function removeFirstIdea(e) {
  if (e.target.className === 'save-button') {
    var ideaInstructions = document.querySelector('.idea-instructions')
    ideaInstructions.remove();
  }
}
function keepFirstIdeaRemoved() {
  if (ideas.length > 0) {
  var ideaInstructions = document.querySelector('.idea-instructions')
  ideaInstructions.remove();  
  }
}
