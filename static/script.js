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

// guess button brings up popup for guess
var guessc = document.createElement("button");
guessc = buttons.appendChild(guessc);
guessc.innerHTML = "Guess a Consonant"
var guesscPop = function(){
  console.log("POPUPS: "+ popups[0]);
  popups[0].style.display = "block";

};
guessc.setAttribute("onclick", "javascript:guesscPop()");

var checkc = function(){
  var char = document.getElementById('C');
  console.log("|" + char.value + "|");
  if (tempc.indexOf(char.value) == -1){
    alert("please choose a consonant that hasn't been guessed previously");
  }else{
    alert("yay");
    tempc.splice(tempc.indexOf(char.value), 1);
    console.log(tempc);
  }
}


//==========================VOWEL====
// guess button brings up popup for guess
body.innerHTML += "\n"
var guessv = document.createElement("button");
guessv = buttons.appendChild(guessv);
guessv.innerHTML = "Guess a VOWEL"
var guessvPop = function(){
  popups[0].style.display = "block";
};
guessv.setAttribute("onclick", "javascript:guessvPop()");

var checkv = function(){
  var char = document.getElementById('V');
  console.log("|" + char.value + "|");
  if (tempv.indexOf(char.value) == -1){
    alert("please choose a VOWEL that hasn't been guessed previously");
  }else{
    alert("yay");
    tempv.splice(tempv.indexOf(char.value), 1);
    console.log(tempv);
  }
}

// background specific to this page
document.getElementsByTagName("body")[0].style.backgroundImage = "url(http://vignette1.wikia.nocookie.net/gameshows/images/6/61/Wheel_of_Fortune_Puzzle_Board_6.png/revision/latest?cb=20130127193907)"
document.getElementsByTagName("body")[0].style.backgroundRepeat = "no-repeat"
document.getElementsByTagName("body")[0].style.backgroundAttachment = "fixed"
document.getElementsByTagName("body")[0].style.backgroundPosition = "center"


console.log(body);
console.log(body.innerHTML);
console.log(buttons);
console.log(buttons.innerHTML);
