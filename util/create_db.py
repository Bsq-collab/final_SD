import sqlite3
import csv
import api
import images

f="wof.db"
db=sqlite3.connect(f)
c=db.cursor()


#~~~~~~~~~~~~~~~~~~creating tables~~~~~~~~~~~~~~~~~~~
command= "CREATE TABLE question(phrase TEXT PRIMARY KEY, category TEXT, question TEXT, image TEXT)"
c.execute(command)
#### ===============NOT UNTIL POST MVP =====================####
command= "CREATE TABLE accounts(phrase TEXT PRIMARY KEY, category TEXT, question TEXT, image TEXT)"
c.execute(command)

db.commit() #save changes
db.close()  #close database
