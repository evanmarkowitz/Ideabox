var saveButton = document.querySelector('.save-button');


saveButton.addEventListener('click', saveIdea);

function saveIdea(e) {
  e.preventDefault();
  console.log("first step");
  var idea = new Idea(titleInput.value, bodyInput.value);
  console.log("created new instance");
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem('idea', stringifiedIdea);
  console.log("after storing local");
  ideaReload();
}

function ideaReload() {
  var titleText = document.querySelector('#title-thing');
  var bodyText = document.querySelector('#body-thing');
  var parsedIdea = JSON.parse(localStorage.getItem('idea'));
  titleText.innerText = parsedIdea.title;
  bodyText.innerText = parsedIdea.body + parsedIdea.quality;
  console.log(parsedIdea);
}

