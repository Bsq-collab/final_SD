from flask import Flask, render_template, request
from util import api
from util import images
import random
from math import *


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


@app.route("/game", methods=["POST", "GET"])
def game():
    if request.method == "POST":
        global noncpu
        noncpu = int(request.form.get('noncpu'))
        global cpu
        cpu = int(request.form.get('cpu'))
        setup_players(noncpu, cpu)
    dictionary = api.jeopardy()
    dictionary['pic']= images.image(dictionary['answer'])
    #pts=[0,0,0]
    # bar at the bottom w player #s + money
    # letter board: while not full, continue cycling through players guessing letters
    # when full, the game is over -> displays name of winner + $
    # spinning the wheel is just an html table changing colors
    # basic player turn example: guess phrase/buy a vowel/spin -> displays whether the letter was right or not (refresh board) -> end turn

    # random_letter(cons) # cpu guesses
    return render_template("game.html", round = dictionary,players = players_ordered, player_dict=players)


@app.route("/letters", methods=["POST"])
def random_letter(letters):
    x = random.randint(0, len(letters))
    return letters.pop(x)

#this initializes the game with blank values for computer players and money
def setup_players(noncpu, cpu):
    # key is player, item is the money
    global players
    players = {}
    players["You"] = 0
    global players_ordered
    players_ordered = []
    players_ordered.append("You")
    for i in xrange(noncpu):
        # i is numbers from 0 to num-1
        #players["User " + str(i + 1)] = 0
        players_ordered.append("User " + str(i + 1))
        players[players_ordered[-1]] = 0
    for i in xrange(cpu):
        # i is numbers from 0 to num-1
        #players["CPU " + str(i + 1)] = 0
        players_ordered.append("CPU " + str(i + 1))
        players[players_ordered[-1]] = 0
    
        


# this makes the blanks using the string, prints any characters that aren't letters.
def make_blanks(string):
    blank=""
    for each in string:
        if(each.isalpha()):
            blank+="_ "
        elif(each==" "):
            blank+="\n"
        else:
            blank+=each
    return blank

if __name__ == "__main__":
    app.debug = True
    app.run()
