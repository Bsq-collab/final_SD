from flask import Flask, render_template
from util import api


app = Flask(__name__)


# default homepage
@app.route("/")
def welcome():
    return render_template("home.html")


@app.route("/directions")
def instructions():
    return render_template("directions.html")


@app.route("/start")
def start():
    return render_template("playerSignUp.html")


@app.route("/game", methods=["POST","GET"])
def game():
    cons= ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']
    vow=['a','e','i','o','u']
    dictionary=api.jeopardy()
    ans=dictionary['answer']
    # bar at the top w player #s + money
    # letter board: while not full, continue cycling through players guessing letters
    # when full, the game is over -> displays name of winner + $ 
    # spinning the wheel is just an html table changing colors
    # basic player turn example: guess phrase/buy a vowel/spin -> displays whether the letter was right or not (refresh board) -> end turn
    
    random_letter(cons) #cpu guesses
    return render_template("game.html")

def random_letter(letters):
    x= random.randint(0,letters.length)
    return letters.pop(x)
    

def make_blanks(string):
    blank=""
    
    
if __name__ == "__main__":
    app.debug = True
    app.run()
