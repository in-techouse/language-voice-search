from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponseRedirect
from googleapiclient.discovery import build
from google_speech import Speech
from django.http import HttpResponse
from googletrans import Translator

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
        audio = r.listen(source, timeout=1, phrase_time_limit=10)
    try:
        output = r.recognize_google(audio) + " "
        service = build("customsearch", "v1", developerKey=my_api_key)
        res = service.cse().list(q=output, cx=my_cse_id, num=5).execute()
        results = res["items"]
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
    translator = Translator()
    translatorResult = translator.translate(text, src="en", dest="ur")
    speech = Speech(translatorResult.text, lang)
    sox_effects = ("speed", "1.0")
    speech.play(sox_effects)
    return HttpResponse("1")


# def tanslate(request):
#     url = request.GET.get("url", "")
#     print("URL in Translate page is: " + url)
#     response = request.get(get_translate_url(url))
#     return response.content
#     # translator = Translator()
#     # translatorResult = translator.translate(text, src="en", dest="ur")
#     # return HttpResponse(translatorResult.text)


# def get_translate_url(url):
#     return "http://translate.google.com/translate?hl=bg&ie=UTF-8&u=%s&sl=en&tl=ur" + url
