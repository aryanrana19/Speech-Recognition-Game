const msgEl = document.querySelector("#msg")
const randomNum = getRandomNumber()
console.log('Number', randomNum)

window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition

let recognition = new window.speechRecognition()
// START RECOGNITION AND GAME
recognition.start()
// CAPTURE USER SPEAK
function onSpeak(e){
  const msg = e.results[0][0].transcript
  writeMessage(msg)
  checkNumber(msg)
}

// WRITE WHAT USER SPEAKS
function writeMessage(msg){
  msgEl.innerHTML = `
    <div>You Said: </div>
    <span class="box">${msg}</span>
  `
}

// CHECK MESSAGE AGAINST NUMBER
function checkNumber(msg){
  const num = +msg
  // CHECK IF VALID NUMBER
  if(Number.isNaN(num)){
    msgEl.innerHTML += '<div>That is not a valid Number.</div>'
    return
  }
  // CHECK IF RANGE
  if(num>100 || num < 1){
    msgEl.innerHTML = '<div>Number must be between 1 and 100!</div>'
    return
  }
  // CHECK NUMBER
  if(num === randomNum){
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br> It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `
  }else if(num > randomNum){
    msgEl.innerHTML = '<div>Go Lower</div>'
  }else{
    msgEl.innerHTML = '<div>Go Higher</div>'
  }
}

// GENERATE RANDOM NUMBER
function getRandomNumber(){
  return Math.floor((Math.random() * 100) + 1)
}

// SPEAK RESULT
recognition.addEventListener("result", onSpeak)
// END SR SERVICE
recognition.addEventListener("end", ()=> recognition.start())
document.body.addEventListener('click', e=>{
  if(e.target.id == 'play-again'){
    window.location.reload()
  }
})