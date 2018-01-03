jeopardy_url = "http://www.jservice.io/api/random"

import urllib2
import json

def jeopardy():
    try:
        global jeopardy_url
        uread = urllib2.urlopen(jeopardy_url).read()
        udict = json.loads(uread)[0]
        round_dict = {}
        round_dict['hint'] = fix_answer(udict['question'])
        round_dict['title'] = fix_answer(udict['category']['title'])
        round_dict['answer'] = fix_answer(udict['answer'])
        return round_dict
    except:
        print "Error: API key was set up incorrectly! jeopardy"
        d = {'hint': "oops"}
        return d

def fix_answer(thing):
    final = thing.lower()
    print "THIS IS THE THING: " + final
    try:
        while (True) :
            start = final.index('<')
            end = final.index('>')
            final = final[:start] + final[end+1:]
            print final
    except:
        try:
            while (True) :
                start = final.index('(')
                end = final.index(')')
                final = final[:start] + final[end+1:]
            print final
        except:
            print "no gang signs"
    return final

dictionary= jeopardy();
print "\n\n\n\n\n dictionary:"
print dictionary
print "\n\ndictionary[hint]: " + dictionary['hint']
print "\n\ndictionary['title']: " + dictionary['title']
print "\n\ndictionary[answer]: " + dictionary["answer"]
