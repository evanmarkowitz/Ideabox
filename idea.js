var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-button');
var quality = ["swill", "plausible", "genius"];

class Idea {
  constructor(id, title, body, quality, starred) {
    this.id = id
    this.title = title;
    this.body = body;
    this.quality = quality;
    this.starred = starred;
  }
  upVote() {
    if(this.quality === quality[0]) {
    this.quality = quality[1]}
    else if (this.quality === quality[1]) {
    this.quality = quality[2]
    }
  }
  downVote() {
    if(this.quality === quality[2]) {
    this.quality = quality[1]}
    else if (this.quality === quality[1]) {
    this.quality = quality[0]
    }
  }
  isStarred() {
    if (this.starred === false) {
      this.starred = true; }
    else  {
      this.starred = false;
    }
  }
  deleteFromStorage(suicide) {
    return ideas.splice(suicide, 1);
  }

  saveToLocalStorage() {
  var stringifiedIdeas = JSON.stringify(ideas);
  localStorage.setItem('ideas', stringifiedIdeas)
  }
 }
