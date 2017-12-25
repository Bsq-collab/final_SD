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
def populate(dictionary, tbln, col1,col2,col3):
    for each in dictionary:
        add= "INSERT INTO "+ tbln + " VALUES ('" + each[col1] + "'," + each[col2] + "," + each[col3] + ")"
        c.execute(add)

populate(peeps,'peeps', 'name','age','id')
populate(courses,'courses', 'code','mark','id')

db.commit() #save changes
db.close()  #close database
