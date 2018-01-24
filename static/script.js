/*
  ==============================================================================

				                  Defined Constants and variables

	==============================================================================
*/

// lists for consonants and vowels
const cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
	            'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
const vow = ['a', 'e', 'i', 'o', 'u'];

// costs for a vowel picture hint and question hint
const vowCost = 250;
const hpCost = 500;
const hqCost = 1000;

// multiplier list; loops through in order and sets multiplier with spin()
const multi = ['2500', '600', '700', '600', '600', '650', '500', '700', '600'
, '550', '500', '600', '650', '700', '800', '500', '650', '900']
var index = 0;
var multiplier = 0;
const spin = function() {
  // display spinnign gif for .75ms
  popups[5].style.display = "block";
  // setTimeout(a,b) runs the function a after b milliseconds
  setTimeout(close, 750);
  var timer = 200;
  var temp = index;
  while(timer <= 3000){
  	timer += Math.random()*(timer-150);
  	index ++;
  	index %= 18;
  	setTimeout(function(){
	    temp ++;
	    temp %= 18;
	    var m = multi[temp];
	    document.getElementById('currMultiplier').innerHTML = "Multiplier: $" + m.toString();
  	}, timer);
  }
  multiplier = multi[index];
}

// keeps track of current game's vowels and consts
var tempc = cons;
var tempv = vow;
var vowelCost = vowCost;

// trackers for buttons
var noVLeft = false;
var noCLeft = false;
var noPHint = false;
var noQHint = false;

// get the answer title and hints
var answer = document.getElementById("anst");
var title = document.getElementById("title");
var hint = document.getElementById("hint");
var pic= document.getElementById("pic");

var ans = answer.innerHTML;
var tit = title.innerHTML;
var hin = hint.innerHTML;
var p = pic.innerHTML;

console.log(ans);
console.log(tit);
console.log(hin);
console.log(p);

// process ans into 2d array of characters (ans[]->word; ans[][]->char)
const ans2 = ans;
ans = ans.split(" ");
for (var i = 0; i < ans.length; i++){
  ans[i] = ans[i].split("");
}



/*
  ==============================================================================

				                  Info Setup

	==============================================================================
*/

// clear and create the display
// bodyy is a div set aside to pass js the values for ans tit and the two hints
var body = document.getElementById('bodyy');
body.innerHTML = "\n";

// create first div block that will display game information
var info = document.createElement('div');

//
info.className = "gameInfo";
info.innerHTML = "Category: " + tit + "\n";

// create game board
// loop through ans to create the underscored display
for (var i = 0; i < ans.length; i++){
  var el = document.createElement("ul");
  el.className = "inlineList";
  el.innerHTML += "\n"
  // list out the the characters of the word
  for (var o = 0; o < ans[i].length; o++){
	  var ell = document.createElement("li");
	  // what the letter is supposed to be will be stored in the elemet name
	  ell.setAttribute("name", ans[i][o]);
	  ell.className = "char";
	  // check if the character needs to be hidden
	  if(cons.indexOf(ans[i][o]) >= 0 || vow.indexOf(ans[i][o]) >= 0){
	    ell.innerHTML = "_";
	  }else{
	    ell.innerHTML = ans[i][o];
	  }
	  el.appendChild(ell);
	  el.innerHTML += "\n"
  }
  info.appendChild(el);
  info.innerHTML += "\n"
}

// this will be the list of the underscores
var chars = info.getElementsByTagName("li");
console.log(chars)

// add display for whose turn it is
var currTurn = document.createElement("H1");
currTurn.setAttribute("id", "currPlayer");
currTurn.setAttribute('style', "color: white; font-size: 80px; text-align: center;");
// inital value will be the first player in the footer
currTurn.innerHTML = document.getElementById('0 name').innerHTML;
currTurn = body.appendChild(currTurn);

// add display for the current multiplier
var currMultiplier = document.createElement("H4");
currMultiplier.setAttribute("id", "currMultiplier");
currMultiplier.setAttribute('style', "color: white; font-size: 30px; text-align: center;");
body.appendChild(currMultiplier);

// append info to body
info = body.appendChild(info);
body.innerHTML += "\n"

// messages is a seperate div that will track and display cpu turns
var messages = document.getElementById("messages");
messages.setAttribute('style', "background-color: rgba(155, 155, 155, 0.8); border-radius: 10px; text-align: center; color: white; font-size: 15px; box-sizing: border-box; padding-left: 3%; padding-right: 3%;");



/*
  ==============================================================================

				                  Button Setup

	==============================================================================
*/

// buttons div contains all the popups for our game
var buttons = document.getElementById("buttons");
var popups = buttons.getElementsByClassName("popup")

// stop submiting of forms(used in popups)
$(document).ready(function(){
  $("form").submit(function(event){
    event.preventDefault();
  });
});

// close(hide) all popups
var close = function(){
  for(var i = 0; i < popups.length; i++)
	  popups[i].style.display = "none";
};

// call close when you click on an X
var Xs = document.getElementsByClassName("close");
for(var i = 0; i < Xs.length; i++)
  Xs[i].addEventListener("click", close);

// helpers for player money
var getCurrPlayerMoney = function(){
  return document.getElementById(currentTurn.toString()).innerHTML;
}
var setCurrPlayerMoney = function(amount) {
  document.getElementById(currentTurn.toString()).innerHTML = amount;
}
// helper function that disables buttons
var setButtons = function(){
  if (currentTurn < noncpu) {
	  if (noVLeft) {
	    guessv.disabled = true;
	  } else {
	    if (vowelCost > parseInt(getCurrPlayerMoney())) {
		    guessv.disabled = true;
	    } else {
		    guessv.disabled = false;
	    }
	  }
	  if (noCLeft) {
	    guessc.disabled = true;
	  } else {
	    guessc.disabled = false;
	  }
	  if (noPHint) {
	    hp.disabled = true;
	  } else {
	    if (hpCost > parseInt(getCurrPlayerMoney())) {
		    hp.disabled = true;
	    } else {
		    hp.disabled = false;
	    }
	  }
	  if (noQHint) {
	    hq.disabled = true;
	  } else {
	    if (hqCost > parseInt(getCurrPlayerMoney())) {
		    hq.disabled = true;
	    } else {
		    hq.disabled = false;
	    }
	  }
	  solve.disabled = false;

  } else {
	  guessc.disabled=true;
	  guessv.disabled=true;
	  solve.disabled=true;
	  hp.disabled=true;
	  hq.disabled=true;
  }
}

// pass in a char and it will fill it in if there are any
// returns the amount of letters filled in
var fillIn = function(char){
  // get all the _ with name char
  var letters = document.getElementsByName(char);
  if(letters.length == 0){
	  alert("There are no '" + char + "'");
  }else{
    for(var i=0; i<letters.length;i++){
  	  var letter=letters[i];
  	  letter.innerHTML= char;
    }
    alert("There are " + letters.length + " '" + char + "'")
  }
  return letters.length;
}


// ----------------------CONSONANT BUTTON-----------------------------
var guessc = document.createElement("button");
guessc = buttons.appendChild(guessc);
guessc.innerHTML = "Guess a CONSONANT"

// bring up the popup for guess when button is clicked
var guesscPop = function(){
  popups[0].style.display = "block";
};
guessc.setAttribute("onclick", "javascript:guesscPop()");

// function for when guessc form is filled out
var checkc = function(){
  var char = document.getElementById('C');
  // check if input is valid
  if (tempc.indexOf(char.value.toLowerCase()) == -1){
	  alert("please enter a CONSONANT that hasn't been guessed previously");
	  return;
  }
  close();
  // update board
  var numLetters = fillIn(char.value);
  setCurrPlayerMoney(((parseInt(getCurrPlayerMoney())) + (multiplier*numLetters)).toString());

  // update consonant storage
  tempc.splice(tempc.indexOf(char.value), 1);
  console.log(tempc);
	char.value = "";
  if (tempc.length == 0) {
	  noCLeft = true;
	  guessc.disabled= true;
  }

  // turn functions declared later
  nextTurn();
  runThroughTurns();
}


// ----------------------VOWEL BUTTON-----------------------------
var guessv = document.createElement("button");
guessv = buttons.appendChild(guessv);

// bring up popup for vowels when button is pressed
guessv.innerHTML = "Guess a VOWEL ($" + vowelCost.toString() + ")";
var guessvPop = function(){
  popups[1].style.display = "block";
};
guessv.setAttribute("onclick", "javascript:guessvPop()");

// function for when guessv form is filled out
var checkv = function(){
  var char = document.getElementById('V');
  if (tempv.indexOf(char.value.toLowerCase()) == -1){
	  alert("please enter a VOWEL that hasn't been guessed previously");
	  return;
  }
  close();
  fillIn(char.value);
	setCurrPlayerMoney(((parseInt(getCurrPlayerMoney())) - vowelCost).toString());

  tempv.splice(tempv.indexOf(char.value), 1);
	char.value = "";
  console.log(tempv);
  if (tempv.length == 0) {
	  noVLeft = true;
	  guessv.disabled= true;
  }
  setButtons();

  guessv.innerHTML = "Guess a VOWEL ($" + vowelCost.toString() + ")";
}

// ----------------------SOLVE BUTTON-----------------------------
var solve = document.createElement("button");
solve = buttons.appendChild(solve);
solve.innerHTML = "Solve"

// bring up the popup for solve when the button is pressed
var guessAPop = function(){
  popups[2].style.display = "block";
};
solve.setAttribute("onclick", "javascript:guessAPop()");

// function for when solve form is filled out
var checkA = function(){
  var input = document.getElementById('answer');
  if(input.value.toUpperCase() == ans2.toUpperCase()){
	  alert("YOU ARE CORRECT");
    // clear the page and display CONGRATULATIONS
	  var playerInfo = document.getElementById("playernav").innerHTML;
	  var winner = document.getElementById('currPlayer').innerHTML;
    var navbar = document.getElementsByTagName('nav')[0];
	  document.body.innerHTML = "";
	  var cgts = document.createElement("h1");
	  cgts.innerHTML = "CONGRATULATIONS!" + "<br>" + winner + " solved correctly!";
	  cgts.setAttribute('style', "color: white; font-size: 100px; text-align: center;");
    var finalscores = document.createElement("div");
	  finalscores.setAttribute('style', "margin-left:30%; width:33%; background-color:yellow; color: black; font-size: 30px; text-align: center;");
	  finalscores.innerHTML = "Leaderboard:" + "<br>" + playerInfo;
    document.body.appendChild(navbar);
    document.body.innerHTML += '<br><br><br>'
	  document.body.appendChild(cgts);
	  document.body.appendChild(finalscores);
		return;
  }
  close();
  nextTurn();
  runThroughTurns();
}

// ----------------------QUESTION HINT BUTTON-----------------------------
var hq = document.createElement("button");
hq = buttons.appendChild(hq);
hq.innerHTML = "Buy Question ($" + hqCost.toString() + ")";

// bring up the popup for buying a question
var buyQ = function(){
  popups[3].style.display = "block";
};
hq.setAttribute("onclick", "javascript:buyQ()");

// checks if question should be shown
var showQ = function(ans){
  if (ans == "no") {
	  close();
	  return;
  }

  // show the question hint
  var display_hint = document.getElementById("jqh");
  display_hint.style.color = "white";
  display_hint.style.backgroundColor = "rgba(255,0,0,0.4)";
  display_hint.style.textAlign = "center";

  var input = document.createElement('P');
	input.innerHTML = hint.innerHTML;
	display_hint.appendChild(input);

  setCurrPlayerMoney((parseInt(getCurrPlayerMoney()) - hqCost).toString());
  noQHint = true;
  hq.disabled = true;
  setButtons();
  close();
}


// ----------------------PICTURE HINT BUTTON-----------------------------
var hp = document.createElement("button");
hp = buttons.appendChild(hp);
hp.innerHTML = "Buy Picture ($" + hpCost.toString() + ")";

// bring up the popup for buy8ing a picture
var buyP = function(){
  popups[4].style.display = "block";
};
hp.setAttribute("onclick", "javascript:buyP()");

// checks if picture should be shown
var showP = function(ans){
  if (ans == "no") {
	  close();
	  return;
  }

  var display_hint=document.getElementById("gph");
  var input = document.createElement('img');
  input.setAttribute('src', p);
  input.setAttribute('height','300px');
  input.setAttribute('style', "display: block; margin: 0 auto;");
	display_hint.appendChild(input);

  setCurrPlayerMoney((parseInt(getCurrPlayerMoney()) - hpCost).toString());
  noPHint = true;
  hp.disabled = true;
  setButtons();
  close();
}



/*
  ==============================================================================

				                  CPU/Turn Functions

	==============================================================================
*/

// find how many human players are playing
var findNoncpu = function() {
  if (document.getElementById('2 name').innerHTML.includes('CPU')) {
	  if (document.getElementById('1 name').innerHTML.includes('CPU')) {
	    return 1;
	  } else {
	    return 2;
	  }
  } else {
	  return 3;
  }
}
var noncpu = findNoncpu();

var currentTurn = 0;

// increments turn
var nextTurn = function() {
  currentTurn = (currentTurn + 1) % 3;
  setButtons();
  document.getElementById('currPlayer').innerHTML = document.getElementById(currentTurn + ' name').innerHTML;
  spin();
}

// CPU guessing helper function
var CPUfillIn = function(char){
  // get the valid underscores
  var letters = document.getElementsByName(char);
  if(letters.length == 0){
    var input = document.createElement('P');
    input.innerHTML = "CPU " + (currentTurn - noncpu + 1) + " guessed '" + char + "', but there are none";
    messages.insertBefore(input,messages.firstChild); // = document.getElementById("buttons");
    alert(input.innerHTML);
    return;
  }

  // else fill in the underscores
  for(var i=0; i<letters.length;i++){
    var letter=letters[i];
    letter.innerHTML= char;
  }

  //changes money
  setCurrPlayerMoney(((parseInt(getCurrPlayerMoney())) + (multiplier*letters.length)).toString());

  //records the message and makes the alert
  var input = document.createElement('P');
  input.innerHTML = "CPU " + (currentTurn - noncpu + 1) + " guessed '" + char + "'";
  messages.insertBefore(input,messages.firstChild);
  alert(input.innerHTML);
}

// cpu guess a random valid consonant
var CPUguessRandomConsonant = function(){
  char = tempc[Math.floor(Math.random()*tempc.length)];
  tempc.splice(tempc.indexOf(char), 1);
  CPUfillIn(char);
  if (tempc.length == 0) {
	  noCLeft = true;
	  guessc.disabled= true;
  }
  nextTurn();
  runThroughTurns();
}

// cpu guess a random valid vowel
var CPUguessRandomVowel = function(){
  char = tempv[Math.floor(Math.random()*tempc.length)];
  tempv.splice(tempv.indexOf(char), 1);
  CPUfillIn(char);
	setCurrPlayerMoney(((parseInt(getCurrPlayerMoney())) - vowelCost).toString());
  if (tempv.length == 0) {
	  noVLeft = true;
	  guessv.disabled = true;
  }
  nextTurn();
  runThroughTurns();
}

// function for CPU to 'guess' answer
var CPUcheckA = function(){
  alert("CPU has guessed '"+ ans2 + "', and they are correct!");
  // clear the page and display CONGRATULATIONS
  var playerInfo = document.getElementById("playernav").innerHTML;
  var winner = document.getElementById('currPlayer').innerHTML;
  var navbar = document.getElementsByTagName('nav')[0];
  document.body.innerHTML = "";
  var cgts = document.createElement("h1");
  cgts.innerHTML = "CONGRATULATIONS!" + "<br>" + winner + " solved correctly!";
  cgts.setAttribute('style', "color: white; font-size: 100px; text-align: center;");
  var finalscores = document.createElement("div");
  finalscores.setAttribute('style', "margin-left:30%; width:33%; background-color:yellow; color: black; font-size: 30px; text-align: center;");
  finalscores.innerHTML = "Leaderboard:" + "<br>" + playerInfo;
  document.body.appendChild(navbar);
  document.body.innerHTML += '<br><br><br>'
  document.body.appendChild(cgts);
  document.body.appendChild(finalscores);
}

// prints current turn and sees if CPU needs to go
var runThroughTurns = function(){
  if (currentTurn < noncpu) {
    console.log("users turn");
    return;
  } else {
    console.log("cpus turn");
    if (tempc.length == 0) {
      if(tempv.length == 0){
        setTimeout(CPUcheckA, 4500);
      }else {
        setTimeout(CPUguessRandomVowel, 4500)
      }
    } else {
      setTimeout(CPUguessRandomConsonant, 4500);
    }
  }
}


/*
  ==============================================================================

				                  Initial Functions to Start Game

	==============================================================================
*/

spin();
runThroughTurns();
setButtons();
