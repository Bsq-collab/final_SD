from flask import Flask, render_template


app= Flask(__name__)

#default homepage
@app.route("/")
def welcome():
    return ""

@app.route("/view")
def tablify():
    return ""


if __name__== "__main__":
    app.debug=True
    app.run()
