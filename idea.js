var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-button');
var quality = ["swill", "plausible", "genius"];

class Idea {
  constructor(id, title, body,) {
    this.id = id
    this.title = title;
    this.body = body;
    this.quality = quality[0];
    this.favorite = false;
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
  starred() {
    if (this.favorite === false) {
      this.favorite = true;
    }
    if (this.favorite === true) {
      this.favorite = false;
    }
  }
  deleteFromStorage(suicide) {
    console.log(ideas)
    return ideas.splice(suicide, 1);
  }

  // saveToStorage() {
  //   does things
  // }
  // deleteFromStorage() {
  //   deletes things
  // }
}
