jeopardy_url = "http://www.jservice.io/api/random"

import urllib2
import json

def jeopardy():
    '''
    returns a dictionary with the jeopardy question, category title, and answer

    '''
    round_dict = {}
    try:
        global jeopardy_url
        uread = urllib2.urlopen(jeopardy_url).read()
        udict = json.loads(uread)[0]
        round_dict['hint'] = fix_answer(udict['question'])
        round_dict['title'] = fix_answer(udict['category']['title'])
        round_dict['answer'] = fix_answer(udict['answer'])
        return round_dict
    except:
        print "Error: API key was set up incorrectly! jeopardy"
        round_dict['hint'] = "hint"
        round_dict['title'] = "title"
        round_dict['answer'] = "answer"
        return round_dict


def fix_answer(thing):
    '''
    initially jeopardy has some hidden tags and apostrophes and quotes that can break our code.
    We parse through all jService lines and remove tags, parentheses, and quotes.
    '''
    final = thing.lower()
    try:
        while (True):
            start = final.index('<')
            end = final.index('>')
            final = final[:start] + final[end+1:]

    except:
        try:
            while (True):
                start = final.index('(')
                end = final.index(')')
                final = final[:start] + final[end+1:]
        except:
            try:
                while (True):
                    ind = final.index("'")

                    final = final[0:ind] + final[ind+1:]

            except:
               print "no change needed"

    return final
