// created function to randomly color each book
function randomColorBG(){
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);
  let bgColor = `rgb(${x}, ${y}, ${z})`;
  return bgColor;
}

// creates uniqueID for each book
let id = 0;
function getUniqueID(){
  return id++;
}


/* Book: tracks all properties in data ✅ */
class Book {
    constructor(author, language, subject, title){
      this.author = author;
      this.language = language;
      this.subject = subject;
      this.title = title;
    }
    Render(){
      // creates a book ID that stays the same for each book
      const bookID = getUniqueID();
      // make a rectangle to symbolize a book
      let div = document.querySelector("#bookSection")
      let rectangle = document.createElement("div");
      rectangle.classList.add("bookCard");    

      // created text element to center text in book
      let bookTextEle = document.createElement("div"); 
      bookTextEle.classList.add("bookText")
      rectangle.setAttribute("id", this.title)
      rectangle.prepend(bookTextEle);
      
      // add color to each book's background
      rectangle.style.backgroundColor = randomColorBG();

      // added innerText to book face
      bookTextEle.innerText = 
      `${this.title}
      by ${this.author} 

      ${this.language}
-
      ${this.subject}
      `

      // creating text section to house comments, add button, and comment history
      let commentSection = document.createElement("div");
      commentSection.classList.add("container")
      commentSection.classList.add("commentSection")

      // creating comment History as an unordered list so comments are added here as li ele
      let commentHistory = document.createElement("ul")
      commentHistory.classList.add("container")
      commentHistory.classList.add("commentHistory")
      commentHistory.classList.add("w-50")
      commentHistory.setAttribute("id", `commentHistory${bookID}`);
      commentHistory.textContent = "Comments:";
      commentHistory.style.backgroundColor = "white";
      commentHistory.style.minHeight = "100px";
      commentHistory.style.marginTop = "50px";
      commentHistory.style.display = "none";

      // creating comment to be added
      let comment = document.createElement("textarea");
      comment.setAttribute("maxlength", 280);
      comment.setAttribute("id", `comment${bookID}`)
      comment.classList.add("w-50");
      comment.classList.add("form-control");
      comment.style.marginTop = "10px"

      // creating addCommentButton button for each new comment
      let addCommentButton = document.createElement("button");
      addCommentButton.setAttribute("id", bookID)
      addCommentButton.setAttribute("type", "button");
      addCommentButton.classList.add("btn", "btn-primary", "addCommentButton");
      addCommentButton.innerText = "Add Comment";
      addCommentButton.style.marginTop = "10px"

      // adds visible dynamic counter for charCount
      let countRemaining = document.createElement("div");
      countRemaining.classList.add("countRemaining")
      countRemaining.style.textAlign = "right";
      countRemaining.innerText = "280 characters remaining";
      let maxChars = 280;
      comment.addEventListener('input', () => {
          // code in here will run every time anything is typed into the textbox
          // change color if text is less than 10%
          const remaining = maxChars - comment.value.length; // myTextArea.value.length measures length of chars;
          // ternary operator: if less than 10%, text color turns red
          const color = remaining < maxChars * .1 ? 'red' : null;
          countRemaining.innerText = `${remaining} characters remaining`; // change text dynamically
          countRemaining.style.color = color;
      });
      this.id = this.id++;
      // adds book to the top of the section
      div.prepend(rectangle, commentSection);
      commentSection.append(comment, countRemaining, addCommentButton, commentHistory)


      const buttonPressed = e => {
        commentHistory.style.display = "list-item";
        let bookID = e.target.id; // gives unique ID
        let commentToAdd = document.querySelector(`#comment${bookID}`).value;
        let newLi = document.createElement("li");
        newLi.innerText = commentToAdd; // finally adds text as a comment!!!!
        let commentSection = document.querySelector(`#commentHistory${bookID}`);
        commentSection.append(newLi)
        commentToAdd = document.querySelector(`#comment${bookID}`);
        commentToAdd.value = '';
      }
      
      // pressing addCommentButton will add a li to the comments section
      let addCommentButtons = document.querySelectorAll(".addCommentButton");
      
      for (let button of addCommentButtons) {
        button.addEventListener("click", buttonPressed)
      }


    }
    
}
/*bookshelf should: 1. maintain array of shelf 2. add books to bookshelf ✅*/
class Bookshelf {
    constructor(){
        this.shelf = [];
    }
    // adding book to bookshelf
    Add(bookObj){
      this.shelf.unshift(bookObj);
    }
}

// create eternal bookshelf (holds all books ever created)
let eternalBookshelf = new Bookshelf();


// I used .map to render all the books within book-data.js
let loopThrough = (currEle) => {
  let currBook = new Book(currEle.author, currEle.language, currEle.subject, currEle.title);
  currBook.Render();
  eternalBookshelf.Add(currBook);
}

//loop through bookData
bookData.map(loopThrough);


// hitting the submit button adds a new book the the bookshelf! ✅
document.querySelector("#submit").addEventListener("click", function (){
  let newTitle = document.querySelector('#Title').value;
  let newAuthor = document.querySelector('#Author').value;
  let newLang = document.querySelector('#Language').value;
  let newSubj = document.querySelector('#Subject').value;
  let newBook = new Book (newAuthor, newLang,newSubj, newTitle);
  eternalBookshelf.Add(newBook);
  newBook.Render();
  document.querySelector("#newBookForm").reset();
})







