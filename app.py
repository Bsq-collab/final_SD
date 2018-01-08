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


@app.route("/game")
def game():
    # pass round data
    return render_template("game.html")


if __name__ == "__main__":
    app.debug = True
    app.run()
