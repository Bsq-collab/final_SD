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


# directions page
@app.route("/directions")
def instructions():
    return render_template("directions.html")


# start page
@app.route("/start")
def start():
    return render_template("playerSignUp.html")


# game page
@app.route("/game", methods=["POST", "GET"])
def game():
    # get how many noncpu players from start page
    if request.method == "POST":
        # players - player scores
        # players_ordered - the order for players
        players = {}
        players_ordered = []
        global noncpu
        noncpu = int(request.form.get('noncpu'))
        setup_players(noncpu, players, players_ordered)
    # get values for the wheel of fortune round
    dictionary = api.jeopardy()
    dictionary['pic'] = images.image(dictionary['answer'])
    return render_template("game.html", round=dictionary, players=players_ordered, player_dict=players)


@app.route("/letters", methods=["POST"])
def random_letter(letters):
    x = random.randint(0, len(letters))
    return letters.pop(x)


# helper - sets up the players and players_ordered list/dict
def setup_players(noncpu, players, players_ordered):
    # key is player, item is the money
    for i in xrange(noncpu):
        players_ordered.append("User " + str(i + 1))
        players[players_ordered[-1]] = 0
    for i in xrange(3-noncpu):
        players_ordered.append("CPU " + str(i + 1))
        players[players_ordered[-1]] = 0


if __name__ == "__main__":
    app.debug = True
    app.run()
