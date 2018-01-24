### Team ViBayan and Helibnul presents...
# :heavy_dollar_sign: :ferris_wheel: :moneybag: WHEEL OF FORTUNE :moneybag: :ferris_wheel: :heavy_dollar_sign:
---
Wheel of Fortune is America's Game. It will live forever in the hearts of the millions that watch it. Day by day, episode by episode, our country began to fall in love with the show hosted by Pat Sajak. The viewers watched in aww while simultaneously exercising their minds in their search for the correct phrases. When the contestants guessed the correct letters, the board would light up with the help of Vanna White, and everyone would grow one step closer to guessing the answer. Now, for the first time ever in Stuyvesant's software development class, Team ViBayan and Helibnul has reconstructed this game for the good of everyone.

## Features
* Up to 3 players
* Endless phrases to guess
* CPU players
* Live updating of the board
* Access to the answer (use with integrity or to feel smart)

## How it Works
  Wheel of Fortune uses the [Jeopardy API](http://jservice.io) to acquire a category, answer and question. The category will be the category for the answer, which will be used as the phrase for our game. Users will be allowed to buy hints in the form of the question from [Jeopardy API](http://jservice.io) or an image of the answer processed through the [Getty Images API](http://developers.gettyimages.com/en/). The game continues until someone fills in or guesses the correct phrase.

  The AI guesses a random valid constant until it exhausts the list and then continues onto the vowels. You can have up to 2 CPUs in any game.

  This app has been tested in Chrome, Firefox and Safari

### Dependencies
* Python 2.7
* Flask
* JavaScript
* jQuery
* HTML/CSS
* Virtual Environment (optional)

### Python 2.7 - This will be the language the server will be using
```
$ sudo apt install python2.7
```

### Virtual Environment - All additional installs should ideally be made in a Virtual Environment
To install a venv called <name>, run these commands in your terminal:
```
$ pip install virtualenv
$ virtualenv <name>
```
On Mac/Linux, start up your venv with:
```
$ . <name>/bin/activate
```
On Windows:
```
$ . <name>/Scripts/activate
```

### Flask and Requests - These two libraries will be used to run the server
In your activated venv, run the following:
```
$ pip install flask
$ pip install requests
```

### Running on localhost
With your venv activated if you have one
```
$ git clone https://github.com/bberri1205/final_SD.git
$ cd final_SD
$ python app.py
```

## List of APIs/How to Procure Keys:
* #### Getty Images - for providing picture hints
  1. Head to '''https://developer.gettyimages.com/member/register''' and fill out the form to create a free account
  2. Check your email or the site for the API key
  3. Copy the key into the '''gettykeys.txt''' file in the root of the directory. It should be the first and only line in the file, formatted as such:

* #### JService - for providing phrases, categories, and sentence hints
  1. JService does not require a key, so don't worry about finding one


## Contributors
Bayan, Charles, Ibnul, Vivien
