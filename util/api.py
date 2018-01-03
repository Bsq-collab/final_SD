jeopardy_url = "http://www.jservice.io/api/random"

import urllib2
import json

def jeopardy():
    try:
        global jeopardy_url
        uread = urllib2.urlopen(jeopardy_url).read()
        udict = json.loads(uread)[0]
        round_dict = {}
        round_dict['hint'] = udict['question']
        round_dict['title'] = udict['category']['title']
        round_dict['answer'] = udict['answer'].lower()
        return round_dict
    except:
        print "Error: API key was set up incorrectly! jeopardy"
        d = {'hint': "oops"}
        return d


dictionary= jeopardy();
print "\n\n\n\n\n dictionary:"
print dictionary
print "\n\ndictionary[hint]: " + dictionary['hint']
print "\n\ndictionary['title']: " + dictionary['title']
print "\n\ndictionary[answer]: " + dictionary["answer"]
