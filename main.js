var saveButton = document.querySelector('.save-button');

saveButton.addEventListener('click', saveIdea);

function saveIdea() {
  var idea = new Idea(titleInput.value, bodyInput.value);
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem('idea', stringifiedIdea);
}