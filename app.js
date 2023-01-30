const gameContainer = document.getElementById("game");
let selectedItems = document.querySelectorAll('.selected');
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

let scoreBox = document.querySelector('.score-box');
scoreBox.innerText = `Score = ${score}; High Score = ${highScore}`

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add('card');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  

  let selectedCard = event.target;
  let selectedCardId = selectedCard.getAttribute('class');
  
  //this reloads our node list of cards that are selected
  selectedItems = document.querySelectorAll('.selected');
  // console.log(selectedItems);
  if (selectedCardId.includes('selected')){
    //do nothing
    console.log('this was already chosen')
    //add 
  }
  else if(selectedItems.length === 2){
    console.log('too many cards chosen, please wait')
  }

  else {
    selectedCard.classList.add('selected')
    selectedCard.classList.remove('card')

    score +=1;

  scoreBox.innerText = `Score = ${score}; High Score = ${highScore}`

    selectedItems = document.querySelectorAll('.selected');
    // console.log(selectedItems);
    checkCardCount();
  }
  
  

}

// when the DOM loads
createDivsForColors(shuffledColors);

function checkCardCount() {
  
  //if count is zero, add one to it
  if(selectedItems.length === 1){
    // console.log('count is now 1')
  } else {
// if count is 1, 
    //then compare classes and 
    let classCardOne = selectedItems[0].getAttribute('class');
    let classCardTwo = selectedItems[1].getAttribute('class');
   // if they match
   if(classCardOne === classCardTwo){
      //remove class selected and add class matched
      //reset count to 0
      selectedItems[0].classList.remove('selected');
      selectedItems[1].classList.remove('selected');
      selectedItems[0].classList.add('matched');
      selectedItems[1].classList.add('matched');
      checkGameOver();
   }
   else{
    //if they do not match
      //wait 1 second and then remove class selected
      setTimeout(function(){
      selectedItems[0].classList.remove('selected');
      selectedItems[1].classList.remove('selected');
      selectedItems[0].classList.add('card');
      selectedItems[1].classList.add('card');
      }, 1000)
   }
   
  }
  
};


const startButton = document.querySelector('#start');
startButton.addEventListener('click', function(){
  window.location.reload();
})






//dropdown theme
const dropDownContainer = document.querySelector('.dropdown-content');

function myFunction() {
  dropDownContainer.classList.toggle('show')
}

// window.onclick = function(event) {
//   if (event.target.classList.contains('dropdown')) {
//     console.log(event.target)
// }
//   else{
//     myFunction()
//     }  }

window.onclick = function(event) {
  if (event.target.classList.contains('dropdown')) {
    myFunction();
    
  }
  else{
    //if id is option 1 - set div background to option 1
    // console.log(event.target.getAttribute('id'));
    let gameCards = document.getElementsByClassName('card');


    let clickLocationID = event.target.getAttribute('id');
    if (clickLocationID === 'option-1'){
      for (let i=0; i< gameCards.length; i++){
        // console.log(gameCards[i])
      gameCards[i].classList.add('option-1')
      gameCards[i].classList.remove('option-2')
      gameCards[i].classList.remove('option-3')
      }
      
    }
    if (clickLocationID === 'option-2'){
      for (let i=0; i< gameCards.length; i++){
        // console.log(gameCards[i])
      gameCards[i].classList.add('option-2')
      gameCards[i].classList.remove('option-1')
      gameCards[i].classList.remove('option-3')
      }
    }
    if (clickLocationID === 'option-3'){
      for (let i=0; i< gameCards.length; i++){
        // console.log(gameCards[i])
      gameCards[i].classList.add('option-3')
      gameCards[i].classList.remove('option-2')
      gameCards[i].classList.remove('option-1')
      }
    }
    
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function checkGameOver(){
  let matchedCards = document.getElementsByClassName('matched');
  if (matchedCards.length === 10){
    //set div to id game over
    let gameOverPopup = document.querySelector('.game-over-popup');
    gameOverPopup.setAttribute('class', 'show');
    // button for restart

      const playAgainButton = document.querySelector('#new-game');
      playAgainButton.addEventListener('click', function(){
        window.location.reload();
      })


    // save score to high score if its the best
      if(score < highScore || highScore === 0){
        highScore = score;
        localStorage.setItem('highScore', highScore);
      }

    let highScoreDiv = document.querySelector('#high-score');
    
    highScoreDiv.innerText = `High Score: ${highScore}`

    let yourScoreDiv = document.querySelector('#your-score');
    yourScoreDiv.innerText = `Your score: ${score}`

    // save high score and theme to local storage
    console.log('game-over');
  }
}

