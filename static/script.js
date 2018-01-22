
// defined for game
const cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
const vow = ['a', 'e', 'i', 'o', 'u'];

// keeps track of current game's vowels and consts
var tempc = cons;
var tempv = vow;

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
body.appendChild(currTurn);

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
    //console.log("THIS IS THE THING: " + (parseInt(getCurrPlayerMoney())));// + (multiplier*letters.length));
    setCurrPlayerMoney(((parseInt(getCurrPlayerMoney())) + (multiplier*letters.length)).toString());
}

// ===================CONSONANT=========
// guess button brings up popup for guess
var guessc = document.createElement("button");
guessc = buttons.appendChild(guessc);
guessc.innerHTML = "Guess a CONSONANT"
var guesscPop = function(){
  // console.log("POPUPS: "+ popups[0]);
  popups[0].style.display = "block";
};
guessc.setAttribute("onclick", "javascript:guesscPop()");

var checkc = function(){
    var char = document.getElementById('C');
    console.log("|" + char.value + "|");
    if (tempc.indexOf(char.value) == -1){
	alert("please enter a CONSONANT that hasn't been guessed previously");
	return;
    }else{
	close();
	fillIn(char.value);
    }
    tempc.splice(tempc.indexOf(char.value), 1);
    console.log(tempc);
    if (tempc.length == 0) {
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
guessv.innerHTML = "Guess a VOWEL"
var guessvPop = function(){
  popups[1].style.display = "block";
};
guessv.setAttribute("onclick", "javascript:guessvPop()");

var checkv = function(){
    var char = document.getElementById('V');
    console.log("|" + char.value + "|");
    if (tempv.indexOf(char.value) == -1){
	alert("please enter a VOWEL that hasn't been guessed previously");
    }else{
	close();
	fillIn(char.value);
    }
    tempv.splice(tempv.indexOf(char.value), 1);
    console.log(tempv);
    if (tempv.length == 0) {
	guessv.disabled= true;
    }
}
//===============================ANSWER======
// guess button brings up popup for guess
body.innerHTML += "\n"
var solve = document.createElement("button");
solve = buttons.appendChild(solve);
solve.innerHTML = "solve"
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
 // console.log(arrToStr(ans[0]));
  console.log("answer: "+ ans);
  var a= arrToStr(ans);
  console.log("a:_"+ a+"_");
  console.log("a==char.value: "+ a==char.value);
  if(char.value+" "==a){
    alert("CORRECT");
    document.body.innerHTML = "";
    var cgts = document.createElement("h1");
    cgts.innerHTML = "CONGRATULATIONS!" + "<br>" + "YOU GUESSED CORRECTLY!";
    cgts.setAttribute('style', "color: white; font-size: 100px; text-align: center;");
    document.body.appendChild(cgts);
}
 // else if(char.value!=a){
 //alert("INCORRECT!");
  //}
}

//===============================Question Hint==========
body.innerHTML += "\n"
var hq = document.createElement("button");
hq = buttons.appendChild(hq);
hq.innerHTML = "Buy Question"

var buyQ = function(){
    popups[3].style.display = "block";
};

hq.setAttribute("onclick", "javascript:buyQ()");


var showQ = function(ans){
    if (ans == "no") {
	close();
	return;
    }
    //document.body.innerHTML += "<br><br>";
    //newLine();
    //newLine();
    //openCenter();
    //hint.innerHTML = "<br><br>" + hint.innerHTML;
    var display_hint = document.createElement("P");
    display_hint.innerHTML = hint.innerHTML;
    //hint.style.textAlign = "center";
    //hint.style.color = "white";
    //hint.style.backgroundColor = "rgba(255,0,0,0.4)";
    //document.body.appendChild(hint);
    display_hint.style.textAlign = "center";
    display_hint.style.color = "white";
    display_hint.style.backgroundColor = "rgba(255,0,0,0.4)";
    document.body.appendChild(display_hint);
    hq.disabled = true;
    //closeCenter();
    close();
}

//===============================Picture Hint==========
body.innerHTML += "\n"
var hp = document.createElement("button");
hp = buttons.appendChild(hp);
hp.innerHTML = "Buy Picture"

var buyP = function(){
    popups[4].style.display = "block";
};
hp.setAttribute("onclick", "javascript:buyP()");


var showP = function(ans){
    if (ans == "no") {
	close();
	return;
    }
    var pi="<img src='"+p+"'/>"
    console.log("pi: "+pi);
    var im=document.createElement("img");
    im.setAttribute('src',p);
    im.setAttribute('height','200px');
    im.setAttribute('width','200px');
    im.setAttribute('style', "display: block; margin: 0 auto;");
    document.body.appendChild(im);
    hp.disabled = true;
    close();
}





/*
// background specific to this page
document.getElementsByTagName("body")[0].style.backgroundImage = "url(http://vignette1.wikia.nocookie.net/gameshows/images/6/61/Wheel_of_Fortune_Puzzle_Board_6.png/revision/latest?cb=20130127193907)"
document.getElementsByTagName("body")[0].style.backgroundRepeat = "no-repeat"
document.getElementsByTagName("body")[0].style.backgroundAttachment = "fixed"
document.getElementsByTagName("body")[0].style.backgroundPosition = "center"
*/

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
	    //console.log(document.getElementById('1 name').innerHTML.includes('CPU'));
	    return 2;
	}
    } else {
	return 3;
    }
}
var noncpu = findNoncpu(); //number of noncpu players
//console.log(noncpu);

var currentTurn = "0"; //will be the id
//increments turn
var nextTurn = function() {
    currentTurn = ((parseInt(currentTurn) + 1)%3).toString();
    console.log("current turn " + document.getElementById(currentTurn + ' name').innerHTML);
    document.getElementById('currPlayer').innerHTML = document.getElementById(currentTurn + ' name').innerHTML;
    currTurn.innerHTML = "pls"; //document.getElementById(currentTurn + ' name').innerHTML;
}
//nextTurn();
//console.log(currentTurn);

var spinWheel = function(){
    multiplier = Math.ceil(Math.random()*10)*100;
}
var multiplier = Math.ceil(Math.random()*10)*100;
//spinWheel();
//console.log(multiplier);

// returns a random eligible consonant
var randomConsonant = function() {
    return tempc[Math.floor(Math.random()*tempc.length)];
}

var guessRandomConsonant = function(){
    char = randomConsonant();
    //console.log(char);
    console.log("|" + char + "|");
    tempc.splice(tempc.indexOf(char), 1);
    console.log(tempc);
    CPUfillIn(char);
    if (tempc.length == 0) {
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
	//messages = [input].concat(messages);
	//document.getElementById("messages") = [input].concat(messages);
	alert("CPU " + (parseInt(currentTurn) - noncpu + 1) + " guessed '" + char + "', but there are none");
	return;
    }
    for(var i=0; i<letters.length;i++){
	var letter=letters[i];
	console.log("letter: "+ letter);
	letter.innerHTML= char;
    }
    var input = document.createElement('P');
    input.innerHTML = "CPU " + (parseInt(currentTurn) - noncpu + 1) + " guessed '" + char + "'"; 
    messages.insertBefore(input,messages.firstChild); // = document.getElementById("buttons");
    alert("CPU " + (parseInt(currentTurn) - noncpu + 1) + " guessed '" + char + "'");
}

//after every consonant guess, the turn is incremented and this is run
//this is the cyle through turns method
//it is very important
//respect it
var runThroughTurns = function(){
    spinWheel();
    if (parseInt(currentTurn) < noncpu) {
	console.log("current turn: " + currentTurn);
	console.log("users turn");
	return;
    } else {
	console.log("cpus turn");
	setTimeout(guessRandomConsonant, 2000);
	//guessRandomConsonant()
	//nextTurn();
    }
}

var getCurrPlayerMoney = function(){
    return document.getElementById(currentTurn).innerHTML;
}

var setCurrPlayerMoney = function(amount) {
    document.getElementById(currentTurn).innerHTML = amount;
}

/*
while (true) {
    //setTimeout(runThroughTurns,2000);
    runThroughTurns();
}
*/
//spin of the wheel


//var player_dict; //dict of players and their points <- needed because then we'd have to grab that value way too often

//everytime anyone gets a c right, give them the multiplier in points
//everytime guesses a vowel, lose 100
//solves questions gets 3000, but also wins so whatev
//word hint costs 1000
//picture hints costs 500

//var cpuTurn = function(id)
    //guesses letter
    //if have enough money
    //   guess random index vowel from tempv
    
