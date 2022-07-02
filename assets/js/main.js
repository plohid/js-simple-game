//element select 
const inputValElm = document.querySelector('#input-value');
const targetInputFormElm = document.querySelector('#targetInputForm');
const targetScoreElm = document.querySelector('#targetUi');
// player btn element element 
let p1BtnElm = document.querySelector('#btnP1'); 
let p2BtnElm = document.querySelector('#btnP2'); 

//player score element 
const p1ScoreElm = document.querySelector('#p1Score')
const p2ScoreElm = document.querySelector('#p2Score')
const htmlH3Elm = document.querySelector('h3')

const turnElm = document.querySelector('#turnScore')

const resetBtnElm = document.querySelector('#resetBnt')

const awardElm = document.querySelector('.gtr-name')
//player input field 
const player1NameInputElm = document.querySelector('#p1Name')
const player2NameInputElm = document.querySelector('#p2Name')

const playerNameFormElm = document.querySelector('#playerNameForm')

//display board scroe name 
let scoreName1 = document.querySelector('#scoreName1');
let scoreName2 = document.querySelector('#scoreName2');

//data layer
let targetScore = 15; 
let p1Score = 0; 
let p2Score = 0; 
let playerTurn = 'player1';
let playerOneName = 'Player-1';
let playerTwoNme= 'Player-2'; 

// view layer 
targetScoreElm.textContent = targetScore; 
p1ScoreElm.textContent= p1Score ;
p2ScoreElm.textContent= p2Score ;
turnElm.textContent = 0; 
p1BtnElm.textContent = playerOneName
p2BtnElm.textContent = playerTwoNme

// eventlistener
targetInputFormElm.addEventListener('submit', (e)=>{

    e.preventDefault()
    const inputVal = +inputValElm.value ;
    targetScore = inputVal; 
    //validate target input
    validateTargetInput()




})
playerNameFormElm.addEventListener('submit', e=>{

    e.preventDefault()

    playerOneName = player1NameInputElm.value ;
    playerTwoNme = player2NameInputElm.value; 
    
    scoreName1.textContent = playerOneName
    scoreName2.textContent = playerTwoNme
    p1BtnElm.textContent = playerOneName
    p2BtnElm.textContent = playerTwoNme
    
    player1NameInputElm.value = '';
    player2NameInputElm.value = ''; 
    
    if(!playerOneName){
        playerOneName = p1BtnElm.textContent = 'player-1'
        playerOneName = scoreName1.textContent = 'player-1'
    }
    if(!playerTwoNme){
        playerTwoNme = p2BtnElm.textContent = 'player-2'
        playerTwoNme = scoreName2.textContent = 'player-2'
    }

})
p1BtnElm.addEventListener('click', (e)=>{
    const randomResult = generateRandomNumber(5)
    p1Score = p1Score + randomResult
    
    if(playerTurn === 'player1'){
        p1ScoreElm.textContent= p1Score; 
        turnElm.textContent = randomResult
        
        playerTurn = 'player2'
        p1BtnElm.setAttribute('disabled', 'disabled')
        p2BtnElm.removeAttribute('disabled')

    }
    //winning state 
    checkWinner()

})
p2BtnElm.addEventListener('click', (e)=>{
    const randomResult = generateRandomNumber(4)
    p2Score = p2Score + randomResult

    if(playerTurn === 'player2'){
        p2ScoreElm.textContent= p2Score; 
        turnElm.textContent = randomResult
        playerTurn = 'player1'
        p2BtnElm.setAttribute('disabled', 'disabled')
        p1BtnElm.removeAttribute('disabled')
    }
    checkWinner()


})

resetBtnElm.addEventListener('click', reset)


function validateTargetInput(){
    const errorInputTarget = `<p class="invalidTarget" style="color: red;"> Please Set Target 15 or higher </p>`
    if(!targetScore || targetScore <= 15){
        if(!document.querySelector('.invalidTarget')){
            targetInputFormElm.insertAdjacentHTML('beforebegin', errorInputTarget )
        }
        inputValElm.value = ''; 

    }else{
        if(document.querySelector('.invalidTarget')){
            document.querySelector('.invalidTarget').remove()

        }
        targetScoreElm.textContent = targetScore; 
        inputValElm.value = ''; 
      
    }
}

function checkWinner(){
    const isP1Winner = targetScore <= p1Score;
    const isP2Winner = targetScore <= p2Score;
    
    if( isP1Winner || isP2Winner){
        p1BtnElm.setAttribute('disabled', 'disabled')
        p2BtnElm.setAttribute('disabled', 'disabled')
    }

    WinnerMsg(isP1Winner, isP2Winner )
}

function WinnerMsg(p1, p2){
    const winMsgText1 = ` <div class="winMsg d-flex align-items-center"> <p style="padding:20px;">Congratulation <span> ${playerOneName} </span>  Is Winnnnnnnnn</p> <img style="height: 100px;" src="assets/img/1V8t.gif" alt="award-img"></img></div> `
    const winMsgText2 = ` <div class="winMsg d-flex align-items-center"> <p style="padding:20px;">Congratulation <span> ${playerTwoNme} </span>  Is Winnnnnnnnn</p> <img style="height: 100px;" src="assets/img/1V8t.gif" alt="award-img"></img></div> `
   
    if(p1){
        htmlH3Elm.insertAdjacentHTML('afterend', winMsgText1 )
    }else if(p2){
        htmlH3Elm.insertAdjacentHTML('afterend', winMsgText2 )
    }

}

function generateRandomNumber(max){
    const random = Math.floor(Math.random() * max) ;
    return random; 
}

function reset(){
    //data layer
    targetScore = 15; 
    p1Score = 0; 
    p2Score = 0; 
    playerOneName = 'Player-1' ; 
    playerTwoNme= 'Player-2'; 
    playerTurn = 'player1';


// view layer 
targetScoreElm.textContent = targetScore; 
p1ScoreElm.textContent= p1Score ;
p2ScoreElm.textContent= p2Score ;
turnElm.textContent = 0; 
scoreName1.textContent = playerOneName
scoreName2.textContent = playerTwoNme
p1BtnElm.textContent = playerOneName
p2BtnElm.textContent = playerTwoNme

p1BtnElm.removeAttribute('disabled')
p2BtnElm.removeAttribute('disabled')

//remove winning msg 
if(document.querySelector('.winMsg')){
    document.querySelector('.winMsg').remove()
}

}






// default targer set :15, if you want u can set avobe as your desire, and when match the target number any one player thn this player is win. after win the player button will be desable 

