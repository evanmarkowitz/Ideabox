/* 
1. Query Title input.
2. Query Body input.
3. Query Save button.

4. Create eventListener on the 'save-button'; listen for 'click' to invoke a 'save-idea function'.

5. Create the save-idea function/class:
.a: The Idea class will...
create an object called 'idea' that can instantiate 'new ideas' via 
constructor() method:
-id: string (unique)
-title: string (titleInput.value)
-body: string (bodyInput.value)
-quality: array (["swill", "plausible", "genius"])
-favorite: boolean (false)

.b: The Idea class will have...
saveToStorage: function will save instance to localStorage.
deleteFromStorage: self-expl
updateIdea: function will enable update of idea's body, title, or starred state.
updateQuality: enable edit quality.

.c: The save-idea function will also...
append a new <article> element; the new idea card.


6. Assign a variable to stringify the object using JSON.

7. Set the stringified object into local storage.






//Recalling stored object:

1.  Create var for localStorage.getItem on the stored object.
2. Create var for JSON.parse on above var for stored object.
3. Use JSON.parse var to recall instance of object via function to update dom






//Phase One features:

1. The Save button should be disabled if either the Title or Body inputs are empty.

2. onClick Save, 
- a new idea should appear in the idea list.
- text fields should be cleared and ready to accept a new idea.
- the idea should be persisted up reloading the page.

3. Each idea in the list should have a button to remove it from both the data model and the dom. 
.a: This update of the data model should happen in a deleteFromStorage method in the Idea class.
.b: How the dom gets updated via JS should happen in the main.js file.

4. Upon clicking the delete button, the appropriate idea should be removed from the list. 

5. The page should not reload when an idea is deleted. 








//Save button pseudocode 

onClick Save button:

create a new instance of idea; insert titleInput.value && bodyInput.value. 

var stringifiedNewInstance = JSON.stringify(newInstance)

localStorage.setItem(instanceID, stringifiedNewInstance). 

var parsedInstance = JSON.parse(localStorage.getItem(newInstanceID)).

append card based on parsedInstance??




 

*/