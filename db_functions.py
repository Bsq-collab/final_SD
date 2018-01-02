import sqlite3
import csv

f="wof.db"
db=sqlite3.connect(f)
c=db.cursor()


#~~~~~~~~~~~~~~~~~~creating tables~~~~~~~~~~~~~~~~~~~
command= "CREATE TABLE question(phrase TEXT PRIMARY KEY, category TEXT, question TEXT, image TEXT)"
c.execute(command)
#### ===============NOT UNTIL POST MVP =====================####
command= "CREATE TABLE accounts(phrase TEXT PRIMARY KEY, category TEXT, question TEXT, image TEXT)"
c.execute(command)

#~~~~~~~~~~~~~~~~~~populating tables~~~~~~~~~~~~~~~~~~~


def populate_j(dictionary, tblname, col1,col2,col3):
    #for each in dictionary:
        add= "INSERT INTO "+ tblname + " VALUES ('" + dictionary[col1] + "'," + dictionary[col2] + "," + dictionary[col3] + ")"
        c.execute(add)

dictionary= jeopardy()
tblname= "questions"
col1='hint'
col2='title'
col3='answer'

populate_j(dictionary,tblname,col1,col2,col3);

db.commit() #save changes
db.close()  #close database
