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

  updateIdeaQuality(className) {
    if (className === "quality-up-img") {
      var currentQualityIndex = quality.indexOf(this.quality)
      if (currentQualityIndex < quality.length - 1) {
        var newQualityIndex = currentQualityIndex + 1
        this.quality = quality[newQualityIndex]
      }
    } else if (className === "quality-down-img") {
      var currentQualityIndex = quality.indexOf(this.quality)
      if (currentQualityIndex > 0) {
        var newQualityIndex = currentQualityIndex - 1;
        this.quality = quality[newQualityIndex]
      }
    } else if (className === "fave-img") {
      if (this.starred === false) {
        this.starred = true;
      } else {
        this.starred = false;
      }
    }
  }


  deleteFromStorage(suicide) {
    return ideas.splice(suicide, 1);
  }

  saveToLocalStorage() {
    var stringifiedIdeas = JSON.stringify(ideas);
    localStorage.setItem('ideas', stringifiedIdeas)
  }
  editIdeas(className, newText) {

    if (className === "idea-card-body") {
      this.body = newText;
    } else if (className === "idea-card-title") {
      this.title = newText;
    }
  }
}



//   upVote() {
//     var currentQualityIndex = quality.indexOf(this.quality)
//     if (currentQualityIndex < quality.length -1) {
//     var newQualityIndex = currentQualityIndex + 1
//     this.quality = quality[newQualityIndex]
//   }
//   }
//   downVote() {
//     var currentQualityIndex = quality.indexOf(this.quality)
//     if (currentQualityIndex > 0) {
//     var newQualityIndex = currentQualityIndex - 1;
//     this.quality = quality[newQualityIndex]
//     }
//   }
//   isStarred() {
//     if (this.starred === false) {
//       this.starred = true; }
//     else  {
//       this.starred = false;
//     }
//   }
//   editOfBody() {
//   if(e.target.className === "idea-card-body"){
//     var ideaLocation = findId(e);
//     ideas[ideaLocation].body = e.target.innerText
//     ideas[ideaLocation].saveToLocalStorage();
//     }
// }
// }