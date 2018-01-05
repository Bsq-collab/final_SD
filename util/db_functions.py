import sqlite3
import csv
import api
import images

f="wof.db"
db=sqlite3.connect(f)
c=db.cursor()

#~~~~~~~~~~~~~~~~~~populating tables~~~~~~~~~~~~~~~~~~~


def populate(dictionary, tblname, col1,col2,col3,col4):
        add= "INSERT INTO "+ tblname + " VALUES ('" + dictionary[col1] + "','" + dictionary[col2] + "','" + dictionary[col3] +"','"+col4+ "')"
        #print "\n\nadd: " + add
        c.execute(add)

dictionary= api.jeopardy()
tblname= "question"
col1='answer'
col2='title'
col3='hint'
answer= dictionary['answer']
col4= images.image(answer)

populate(dictionary,tblname,col1,col2,col3, col4)

db.commit() #save changes
db.close()  #close database
