from flask import Flask, render_template


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
    # pass round data
    # bar at the top w player #s + money
    # letter board: while not full, continue cycling through players guessing letters
    # when full, the game is over -> displays name of winner + $ 
    # spinning the wheel is just an html table changing colors
    # basic player turn example: guess phrase/buy a vowel/spin -> displays whether the letter was right or not (refresh board) -> end turn
    # letters guessed are stored in an array
    # cpus guess random letters
    return render_template("game.html")


if __name__ == "__main__":
    app.debug = True
    app.run()
