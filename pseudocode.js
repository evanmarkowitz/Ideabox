PHASE I:

//Have Title and Body input fields.
//Have a Save Button.

Save-Button, onClick, should...
//- spawn an idea card.
// - the page should not reload.
// - on page reload, the cards should persist.

The idea list... 
// - have X button to remove idea from dom and dataModel
// - onclick, the proper card should be deleted
// - when deleted, on reload, the card should not re-appear

When user clicks on Title or Body of idea, the text should become editable, pre-populated with existing title/body. 

User should be able to commit changes by pressing Enter or clicking outside the text field. 

When user clicks on the star, it should stay active. 

On reload, their edits should persist.



PHASE II: 

// Ideas should start as 'swill'. 
//- each idea should have an upvote/downvote button. 
- clicking upvote should increase quality one notch.
- clicking downvote should do the opposite.
- incrimenting genius or decrimenting swill will do nothing. 

//Have a search bar. 

// As users type in the search box, the list of ideas should filter in real time to only display ideas whose title/body include the user text. 

// Clearing the search box should restore all ideas to the list. 