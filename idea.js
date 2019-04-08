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
    var currentQualityIndex = quality.indexOf(this.quality)
    if (currentQualityIndex < quality.length -1) {
    var newQualityIndex = currentQualityIndex + 1
    this.quality = quality[newQualityIndex]
  }
  }
  downVote() {
    var currentQualityIndex = quality.indexOf(this.quality)
    if (currentQualityIndex > 0) {
    var newQualityIndex = currentQualityIndex - 1;
    this.quality = quality[newQualityIndex]
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
