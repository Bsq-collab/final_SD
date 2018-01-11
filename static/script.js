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

var ans = answer.innerHTML;
var tit = title.innerHTML;
var hin = hint.innerHTML;

answer.remove();
title.remove();
hint.remove();

console.log(ans);
console.log(tit);
console.log(hin);

// process ans into 2d array of characters (ans[]->word; ans[][]->char)
ans = ans.split(" ");
for (var i = 0; i < ans.length; i++){
  ans[i] = ans[i].split("");
  console.log(ans[i]);
}

// create the display
var body = document.getElementById('body');

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
      console.log("asdasdasdasdsad");
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

//
var guess = document.createElement("button");
guess = buttons.appendChild(guess);
var guessPop = function(){
  popups[0].style.display = "block";
};
var guessClose = function(){
  popups[0].style.display = "none";
};
guess.innerHTML = "Guess a Consonant"
guess.setAttribute("onclick", "javascript:guessPop()");

buttons.innerHTML += "\n"

console.log(body);
console.log(body.innerHTML);
console.log(buttons);
console.log(buttons.innerHTML);
