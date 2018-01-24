// defined for game
const cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
	            'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
const vow = ['a', 'e', 'i', 'o', 'u'];
const multi = ['2500', '600', '700', '600', '600', '650', '500', '700', '600'
               , '550', '500', '600', '650', '700', '800', '500', '650', '900']
var index = 0;
const vowCost = 250;
const hpCost = 500;
const hqCost = 1000;

// keeps track of current game's vowels and consts
var tempc = cons;
var tempv = vow;
var vowelCost = vowCost;

var noVLeft = false;
var noCLeft = false;
var noPHint = false;
var noQHint = false;

// get the answer title and hint
var answer = document.getElementById("anst");
var title = document.getElementById("title");
var hint = document.getElementById("hint");
var pic= document.getElementById("pic");

var ans = answer.innerHTML;
var tit = title.innerHTML;
var hin = hint.innerHTML;
var p= pic.innerHTML;

console.log(ans);
console.log(tit);
console.log(hin);
console.log(p);

//default time for spin is 5000 ms (5s)
var spinWheel = function(){
  popups[5].style.display = "block";
  setTimeout(close, 500);
  multiplier = Math.ceil(Math.random()*10)*100;
}
var openWheelPopup = function() {
  popups[5].style.display = "block";
}
var closeWheelPopup = function() {
  popups[5].style.display = "none";
}

var multiplier = 0;
var timer;
const spin = function() {
    popups[5].style.display = "block";
    setTimeout(close, 1000);
    timer = 200;
    var temp = index;
    while(timer <= 3000){
	timer += Math.random()*(timer-150);
	console.log(timer);
	index ++;
	index %= 18;
	console.log(index);
	setTimeout(function(){
	    temp ++;
	    temp %= 18;
	    var m = multi[temp];
	    console.log(multi[temp]);
	    document.getElementById('currMultiplier').innerHTML = "Multiplier: $" + m.toString();
	}, timer);
    }
    console.log();
    multiplier = multi[index];
}


// process ans into 2d array of characters (ans[]->word; ans[][]->char)
ans = ans.split(" ");
for (var i = 0; i < ans.length; i++){
  ans[i] = ans[i].split("");
  console.log(ans[i]);
}

// create the display
var body = document.getElementById('bodyy');
body.innerHTML = "\n";

// insert title
var category = document.createElement('div');
category.className = "category";
category.innerHTML = "Category: " + tit + "\n";

// create game board
// loop first by word
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
  category.appendChild(el);
  category.innerHTML += "\n"
}

// grab info for different players
/*
  var scores = []
  score.append(document.getElementById('0'));
  score.append(document.getElementById('1'));
  score.append(document.getElementById('2'));
  console.log(scores);
*/

var chars = category.getElementsByTagName("li");

//says whose turn it is
var currTurn = document.createElement("H1");
currTurn.setAttribute("id", "currPlayer");
currTurn.setAttribute('style', "color: white; font-size: 80px; text-align: center;");
currTurn.innerHTML = document.getElementById('0 name').innerHTML;
currTurn = body.appendChild(currTurn);

//says the current multiplier
var currMultiplier = document.createElement("H4");
currMultiplier.setAttribute("id", "currMultiplier");
currMultiplier.setAttribute('style', "color: white; font-size: 30px; text-align: center;");
currMultiplier.innerHTML = "Multiplier: $" + multiplier.toString();
body.appendChild(currMultiplier);


category = body.appendChild(category);
body.innerHTML += "\n"
console.log(chars)


// messages
var messages = document.getElementById("messages");
messages.setAttribute('style', "background-color: rgba(155, 155, 155, 0.8); border-radius: 10px; text-align: center; color: white; font-size: 15px; box-sizing: border-box; padding-left: 3%; padding-right: 3%;");


// buttons
var buttons = document.getElementById("buttons");

// get the popups from the html file
var popups = buttons.getElementsByClassName("popup")

// close any popups
var close = function(){
  for(var i = 0; i < popups.length; i++)
	  popups[i].style.display = "none";
};

// call close when you click on an X
var Xs = document.getElementsByClassName("close");
for(var i = 0; i < Xs.length; i++){
  Xs[i].addEventListener("click", close);
  console.log(Xs[i]);
}

// stop submiting of forms
$(document).ready(function(){
  $("form").submit(function(event){
    event.preventDefault();
  });
});

// pass in a char and it will fill it in if there are any
var fillIn = function(char){
  var letters=document.getElementsByName(char);
  console.log("letters.length: "+letters.length);
  if(letters.length == 0){
	  alert("there are no '" + char + "'");
  }
  for(var i=0; i<letters.length;i++){
	  var letter=letters[i];
	  console.log("letter: "+ letter);
	  letter.innerHTML= char;
  }
  return letters.length;
}

// ===================CONSONANT=========
// guess button brings up popup for guess
var guessc = document.createElement("button");
guessc = buttons.appendChild(guessc);
guessc.innerHTML = "Guess a CONSONANT"
var guesscPop = function(){
  popups[0].style.display = "block";
};
guessc.setAttribute("onclick", "javascript:guesscPop()");

var checkc = function(){
  var char = document.getElementById('C');
  console.log("|" + char.value + "|");
  if (tempc.indexOf(char.value.toLowerCase()) == -1){
	  alert("please enter a CONSONANT that hasn't been guessed previously");
	  return;
  }else{
	  close();
	  var numLetters = fillIn(char.value);
	  var letters=document.getElementsByName(char);
	  setCurrPlayerMoney(((parseInt(getCurrPlayerMoney())) + (multiplier*numLetters)).toString());
	  console.log("CurrentMoney: " + getCurrPlayerMoney());
	  console.log("Letters: " + letters.length);
  }
  tempc.splice(tempc.indexOf(char.value), 1);
  console.log(tempc);
  if (tempc.length == 0) {
	  noCLeft = true;
	  guessc.disabled= true;
  }
  console.log(currentTurn);
  nextTurn();
  console.log(currentTurn);
  runThroughTurns();
}


//==========================VOWEL====
// guess button brings up popup for guess
body.innerHTML += "\n"
var guessv = document.createElement("button");
guessv = buttons.appendChild(guessv);
guessv.innerHTML = "Guess a VOWEL ($" + vowelCost.toString() + ")";
var guessvPop = function(){
  popups[1].style.display = "block";
};
guessv.setAttribute("onclick", "javascript:guessvPop()");

var checkv = function(){
  var char = document.getElementById('V');
  console.log("|" + char.value + "|");
  if (tempv.indexOf(char.value.toLowerCase()) == -1){
	  alert("please enter a VOWEL that hasn't been guessed previously");
	  return;
  }else{
	  close();
	  fillIn(char.value);
  }
  tempv.splice(tempv.indexOf(char.value), 1);
  console.log(tempv);
  if (tempv.length == 0) {
	  noVLeft = true;
	  guessv.disabled= true;
  }
  setCurrPlayerMoney(((parseInt(getCurrPlayerMoney())) - vowelCost).toString());
  setButtons();

  guessv.innerHTML = "Guess a VOWEL ($" + vowelCost.toString() + ")";
}
//===============================ANSWER======
// guess button brings up popup for guess
body.innerHTML += "\n"
var solve = document.createElement("button");
solve = buttons.appendChild(solve);
solve.innerHTML = "Solve"
var guessAPop = function(){
  popups[2].style.display = "block";
};
solve.setAttribute("onclick", "javascript:guessAPop()");

var arrToStr=function(array){
  var ans="";
  for(var o=0;o<array.length;o+=1){
	  for(var i=0;i<array[o].length;i+=1){
	    //console.log("array[o][i]: "+array[o][i]);
	    ans+=array[o][i];
	  }
	  ans+=" ";
  }
  console.log(ans);
  return ans;
}
var checkA = function(){
  var char = document.getElementById('answer');
  console.log("this is supposed to post");
  console.log(char);
  console.log("|" + char.value + "|");
  console.log("answer: "+ ans);
  var a= arrToStr(ans);
  console.log("a:_"+ a+"_");
  console.log("a==char.value: "+ a==char.value);
  if(char.value.toUpperCase()+" "==a.toUpperCase()){
	  alert("CORRECT");
	  var playerInfo = document.getElementById("playernav").innerHTML;
	  console.log(playerInfo);
	  var winner = (document.getElementById('currPlayer').innerHTML);
	  document.body.innerHTML = "";
	  var cgts = document.createElement("h1");
	  var finalscores = document.createElement("div");
	  cgts.innerHTML = "CONGRATULATIONS!" + "<br>" + winner + " solved correctly!";
	  cgts.setAttribute('style', "color: white; font-size: 100px; text-align: center;");
	  finalscores.setAttribute('style', "margin-left:30%; width:33%; background-color:yellow; color: black; font-size: 30px; text-align: center;");
	  finalscores.innerHTML = "Leaderboard:" + "<br>" + playerInfo;
	  document.body.appendChild(cgts);
	  document.body.appendChild(finalscores);
  }
  nextTurn();
  runThroughTurns();
  close();
}

var CPUcheckA = function(){
  var a= arrToStr(ans);
  console.log("a:_"+ a+"_");
  if(Math.random() < 0.33){
	  alert("CPU has guessed '"+ a + "', and they are correct!");
	  document.body.innerHTML = "";
	  var cgts = document.createElement("h1");
	  cgts.innerHTML = "CONGRATULATIONS!" + "<br>" + "YOU GUESSED CORRECTLY!";
	  cgts.setAttribute('style', "color: white; font-size: 100px; text-align: center;");
	  document.body.appendChild(cgts);
  }
  console.log(currentTurn);
  nextTurn();
  console.log(currentTurn);
  runThroughTurns();
}

//===============================Question Hint==========
body.innerHTML += "\n"
var hq = document.createElement("button");
hq = buttons.appendChild(hq);
hq.innerHTML = "Buy Question ($" + hqCost.toString() + ")";

var buyQ = function(){
  popups[3].style.display = "block";
};

hq.setAttribute("onclick", "javascript:buyQ()");


var showQ = function(ans){
  if (ans == "no") {
	  close();
	  return;
  }

  var display_hint=document.getElementById("jqh");
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

//===============================Picture Hint==========
body.innerHTML += "\n"
var hp = document.createElement("button");
hp = buttons.appendChild(hp);
hp.innerHTML = "Buy Picture ($" + hpCost.toString() + ")";

var buyP = function(){
  popups[4].style.display = "block";
};
hp.setAttribute("onclick", "javascript:buyP()");


var showP = function(ans){
  if (ans == "no") {
	  close();
	  return;
  }
  var display_hint=document.getElementById("gph");

  var input = document.createElement('img');
  input.setAttribute('src',p);
  input.setAttribute('height','200px');
  input.setAttribute('width','200px');
  input.setAttribute('style', "display: block; margin: 0 auto;");
	//input.innerHTML = pic.innerHTML;
	display_hint.appendChild(input);

  setCurrPlayerMoney((parseInt(getCurrPlayerMoney()) - hpCost).toString());
  noPHint = true;
  hp.disabled = true;
  setButtons();
  close();
}

console.log(body);
console.log(body.innerHTML);
console.log(buttons);
console.log(buttons.innerHTML);

/*----------------------------HELPER FUNCTIONS FOR AESTHETICS-------------*/

var openCenter = function() {
  return document.body.innerHTML += "<center>";
}
var closeCenter = function() {
  return document.body.innerHTML += "</center>";
}
var newLine = function() {
  return document.body.innerHTML += "<br>";
}
var openItalics = function() {
  return document.body.innerHTML += "<i>";
}
var closeItalics = function() {
  return document.body.innerHTML += "</i>";
}


/*NOTES
  for when trying to check which players are computers/users
  "String".find("other") looks for a string in another one, and returns -1 if not found


  things that will be needed
*/


var findNoncpu = function() {
  if (document.getElementById('2 name').innerHTML.includes('CPU')) {
	  //last person is not a cpu
	  if (document.getElementById('1 name').innerHTML.includes('CPU')) {
	    return 1;
	  } else {
	    return 2;
	  }
  } else {
	  return 3;
  }
}
var noncpu = findNoncpu(); //number of noncpu players

var currentTurn = "0"; //will be the id
//increments turn
var nextTurn = function() {
    currentTurn = ((parseInt(currentTurn) + 1)%3).toString();
    setButtons();
    console.log("current turn " + document.getElementById(currentTurn + ' name').innerHTML);
    document.getElementById('currPlayer').innerHTML = document.getElementById(currentTurn + ' name').innerHTML;
    //spinWheel();
    spin();
    console.log("current multiplier " + multiplier);
    document.getElementById('currMultiplier').innerHTML = ("Multiplier: $" + multiplier.toString());
}



// returns a random eligible consonant
var randomConsonant = function() {
  return tempc[Math.floor(Math.random()*tempc.length)];
}

var guessRandomConsonant = function(){
  char = randomConsonant();
  console.log("|" + char + "|");
  tempc.splice(tempc.indexOf(char), 1);
  console.log(tempc);
  CPUfillIn(char);
  if (tempc.length == 0) {
	  noCLeft = true;
	  guessc.disabled= true;
  }
  nextTurn();
  runThroughTurns();
}

// CPU guessing helper function
var CPUfillIn = function(char){
  var letters=document.getElementsByName(char);
  console.log("letters.length: "+letters.length);
  if(letters.length == 0){
	  var input = document.createElement('P');
	  input.innerHTML = "CPU " + (parseInt(currentTurn) - noncpu + 1) + " guessed '" + char + "', but there are none";
	  messages.insertBefore(input,messages.firstChild); // = document.getElementById("buttons");
	  alert("CPU " + (parseInt(currentTurn) - noncpu + 1) + " guessed '" + char + "', but there are none");
	  return;
  }
  for(var i=0; i<letters.length;i++){
	  var letter=letters[i];
	  console.log("letter: "+ letter);
	  letter.innerHTML= char;
  }
  //changes money
  setCurrPlayerMoney(((parseInt(getCurrPlayerMoney())) + (multiplier*letters.length)).toString());
  //records the message and makes the alert
  var input = document.createElement('P');
  input.innerHTML = "CPU " + (parseInt(currentTurn) - noncpu + 1) + " guessed '" + char + "'";
  messages.insertBefore(input,messages.firstChild);
  alert("CPU " + (parseInt(currentTurn) - noncpu + 1) + " guessed '" + char + "'");
}

var runThroughTurn = function(){
  if (parseInt(currentTurn) < noncpu) {
	  console.log("current : " + currentTurn);
	  console.log("users turn");
	  return;
  } else {
	  console.log("cpus turn");
	  console.log("popup: " + popups[5].style.display);
	  if (tempc.length == 0) {
	    setTimeout(CPUcheckA, 4000);
	  } else {
	    setTimeout(guessRandomConsonant, 4000);
	  }
  }
}

var runThroughTurns = function(){
  setTimeout(runThroughTurn,0);
}

var getCurrPlayerMoney = function(){
  return document.getElementById(currentTurn).innerHTML;
}

var setCurrPlayerMoney = function(amount) {
  document.getElementById(currentTurn).innerHTML = amount;
}

var setButtons = function(){
  if (parseInt(currentTurn) < noncpu) {
	  console.log("buttons being set up for user");
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

spin();
runThroughTurns();
setButtons();
