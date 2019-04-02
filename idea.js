var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-button');
var quality = ["swill", "plausible", "genius"];

class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.quality = quality[0];
    this.favorite = false;
  }
  // saveToStorage() {
  //   does things
  // }
  // deleteFromStorage() {
  //   deletes things
  // }
}
