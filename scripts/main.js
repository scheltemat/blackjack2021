


var dealerSum = 0;
var playerSum = 0;

var dealerAces = 0;
var playerAces = 0;

var hiddenCard = ""
var canHit = true


let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let suits = ['C', 'D', 'H', 'S'];
let deck = [];

window.onload = function() {
    makeDeck();
    shuffle();
}

function makeDeck(){

    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + suits[i]); // A-C, 2-C, --> K-C, A-D, 2-D, --> K-D
        }
    }
}

function shuffle(){

    for(let i = 0; i < deck.length; i++){
        let random = Math.floor(Math.random() * deck.length);
        let swap = deck[i];
        deck[i] = deck[random];
        deck[random] = swap;
    }
}

function cardValue(card){  // ex. 4-D
    let cardInfo = card.split("-");
    let value = cardInfo[0]

    if(isNaN(value)){
        if(value == "A"){ // A = 11 , J/Q/K = 10
            return 11;
        }
        return 10;
    }
    return parseInt(value) // num = num
}

function checkAce(card){ // ex. "A-C"
    if(card[0] == "A"){
        return 1;
    }
    return 0;
}

function dealHidden(){
    dealerCard = deck.pop();
    dealerSum += cardValue(dealerCard);
    dealerAces += checkAce(dealerCard);

    let cardImg = document.createElement('img');
    cardImg.src = "images/back_of_card.png"
    document.getElementById('dealer-hand').append(cardImg)

    console.log(dealerCard);  

    hiddenCard = dealerCard
}

function dealToDealer(){
    dealerCard = deck.pop();
    dealerSum += cardValue(dealerCard);
    dealerAces += checkAce(dealerCard);

    let cardImg = document.createElement('img');
    let card = dealerCard;
    cardImg.src = "images/" + card + ".png"
    document.getElementById('dealer-hand').append(cardImg)

    console.log(card);   
}

function dealToPlayer(){
    playerCard = deck.pop();
    playerSum += cardValue(playerCard);
    playerAces += checkAce(playerCard);

    let cardImg = document.createElement('img');
    let card = playerCard;
    cardImg.src = "images/" + card + ".png"
    document.getElementById('player-hand').append(cardImg)

    console.log(card);
}

function dealButton(){
    if(playerSum == 0){

        dealToPlayer();
        dealHidden();
        dealToPlayer();
        dealToDealer();
        playerScore();

    }
}

function hitButton(){
    if (canHit == true){
        if (playerSum < 21 && playerSum > 0){

            dealToPlayer();
            if(playerSum > 21){
               
                [playerSum, playerAces] = reduceAce(playerSum, playerAces);
            
            }
            playerScore();
        }
        console.log(playerSum);
        console.log(playerAces);
    }
}

function standButton(){
    if (dealerSum > 0){
        while(dealerSum <= 16 && playerSum > 0){
            dealToDealer();
            playerScore();
        }
        [dealerSum, dealerAces] = reduceAce(dealerSum, dealerAces);
        playerScore();
        dealerScore();

        dealerHand.removeChild(dealerHand.firstElementChild)
        let cardImg = document.createElement('img');
        cardImg.src = "images/" + hiddenCard + ".png"
        document.getElementById('dealer-hand').prepend(cardImg)

        if(playerSum > 21){
            playerPoints.innerHTML = "Bust! You Lose!";
        }
        else if(dealerSum > 21){
            playerPoints.innerHTML = "You Win!";
        }
        else if(playerSum > dealerSum){
            playerPoints.innerHTML = "You Win!";
        }
        else if(playerSum == dealerSum){
            playerPoints.innerHTML = "Tie!";
        }
        else if(playerSum < dealerSum){
            playerPoints.innerHTML = "You Lose!";
        }
        canHit = false
    }
}

function reduceAce(sum, aceCount){
    if (sum > 21 && aceCount > 0){
        sum -= 10;
        aceCount -= 1;
    }
    console.log(sum);
    return [sum, aceCount];
    
}

function playerScore(){
    playerPoints.innerHTML = playerSum
}
function dealerScore(){
    dealerPoints.innerHTML = dealerSum
}


let dealCards = document.querySelector('#deal-button')
let hit = document.querySelector('#hit-button')
let stand = document.querySelector('#stand-button')
let playerPoints = document.querySelector('#player-points')
let dealerPoints = document.querySelector('#dealer-points')
let newGame = document.querySelector('#newGame-button')
let dealerHand = document.getElementById('dealer-hand')


dealCards.addEventListener('click', e=>{
    console.log(e);

    dealButton();
})

hit.addEventListener('click', e=>{
    console.log(e);
    
    hitButton();
})

stand.addEventListener('click', e=>{
    console.log(e);

    standButton()
})

newGame.addEventListener('click', e=>{
    location.reload();
})