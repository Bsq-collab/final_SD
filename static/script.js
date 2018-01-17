
// defined for game
const cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
const vow = ['a', 'e', 'i', 'o', 'u'];

// keeps track of current game's vowels and consts
var tempc = cons;
var tempv = vow;

// get the answer title and hint
var answer = document.getElementById("answer");
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

var chars = category.getElementsByTagName("li");
category = body.appendChild(category);
body.innerHTML += "\n"
console.log(chars)





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
    }else{
	close();
	fillIn(char.value);
    }
    tempc.splice(tempc.indexOf(char.value), 1);
    console.log(tempc);
    if (tempc.length == 0) {
	guessc.disabled= true;
    }
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
    hint.style.textAlign = "center";
    hint.style.color = "white";
    hint.style.backgroundColor = "rgba(255,0,0,0.4)";
    document.body.appendChild(hint);
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
