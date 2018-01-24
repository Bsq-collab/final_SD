import urllib2
import urllib
import json


def getKey():
    '''
    opens the file we store our gettykeys in and reads the key.
    Prints an error if key is not found
    '''
    try:
        f = open("gettykeys.txt")
        key = f.read()
        return key.strip()  # Removes Whitespace
    except Exception as e:
        print e
        print "****API KEY NOT FOUND******"
        return ""


def image(answer):
    '''
    takes a parameter answer which is the answer to the jeopardy question.
    returns a link to the image that loads.
    '''
    answer = urllib.quote(answer)
    key = getKey()
    if key != "":
        url = urllib2.Request("https://api.gettyimages.com/v3/search/images?sort_order=most_popular&phrase=" + answer, headers={'Api-Key': getKey()})
    else:
        return key
    uResp = urllib2.urlopen(url)
    contentsraw = uResp.read()
    dat = json.loads(contentsraw)
    if len(dat['images']) == 0:
        return "https://rlv.zcache.com/sad_smiley_face_classic_round_sticker-r364e0eed23d248b982dc0b717710afc1_v9wth_8byvr_324.jpg"
    else:
        return dat['images'][0]['display_sizes'][0]['uri']  # outputs a url to the image
