from django.shortcuts import render
from googleapiclient.discovery import build
from google_speech import Speech
from django.http import HttpResponse
from googletrans import Translator
import pyrebase

firebaseConfig = {
    "apiKey": "AIzaSyDvajKc6FMNHKRMuK2Bw4wrD5eexvQ9Hzg",
    "authDomain": "audible-web-urdu-reader.firebaseapp.com",
    "databaseURL": "https://audible-web-urdu-reader.firebaseio.com",
    "projectId": "audible-web-urdu-reader",
    "storageBucket": "audible-web-urdu-reader.appspot.com",
    "messagingSenderId": "757682856536",
    "appId": "1:757682856536:web:a5283a0b281f7de330a02d",
    "measurementId": "G-Z6HYQYHFV7"
}

firebase = pyrebase.initialize_app(firebaseConfig)

auth = firebase.auth()
database = firebase.database()


def noquote(s):
    return s


pyrebase.pyrebase.quote = noquote

my_api_key = "AIzaSyBJn_yucgbMHwYpTPGao4mv8fGnKOhFajM"
my_cse_id = "005735334869674061878:aiopq1r49ml"


def home(request):
    return render(
        request, "home.html", {"result": "", "error": "", "searchResults": []}
    )


def speak(request):
    output = ""
    data = request.POST.get("record")
    import speech_recognition as sr

    error = ""
    # get audio from the microphone
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source, timeout=5, phrase_time_limit=10)
    try:
        output = r.recognize_google(audio) + " "
        service = build("customsearch", "v1", developerKey=my_api_key)
        res = service.cse().list(q=output, cx=my_cse_id, num=5).execute()
        results = res["items"]
    except sr.WaitTimeoutError as e:
        error = "Couldn't hear anything. Please speak a little loud and clear"
        return render(request, "home.html", {"result": data, "error": error})
    except sr.UnknownValueError:
        error = "Couldn't hear anything. Please speak a little loud and clear"
        return render(request, "home.html", {"result": data, "error": error})
    except sr.RequestError as e:
        error = "Couldn't hear anything. Please speak a little loud and clear"
        return render(request, "home.html", {"result": data, "error": error})
    data = output
    return render(
        request,
        "searchResults.html",
        {"result": data, "error": error, "searchResults": results},
    )


def searchResults(request):
    return render(
        request, "searchResults.html", {"result": "", "error": "", "searchResults": []}
    )


def result(request):
    link = request.GET.get("link", None)
    title = request.GET.get("title", None)
    snippet = request.GET.get("snippet", None)
    return render(
        request, "result.html", {"link": link, "title": title, "snippet": snippet}
    )


def textToSpeech(request):
    text = request.GET.get("text", "")
    lang = "ur"
    translation = database.child("DataSet").order_by_key().limit_to_first(3).get()
    translator = Translator()
    translatorResult = translator.translate(text, src="en", dest="ur")
    speech = Speech(translatorResult.text, lang)
    sox_effects = ("speed", "1.0")
    speech.play(sox_effects)
    return HttpResponse("1")
