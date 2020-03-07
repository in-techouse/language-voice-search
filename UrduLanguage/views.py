from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponseRedirect
from googleapiclient.discovery import build

my_api_key = "AIzaSyBJn_yucgbMHwYpTPGao4mv8fGnKOhFajM"
my_cse_id = "005735334869674061878:aiopq1r49ml"

def home(request):
    return render(request, 'home.html', {"result": "", "error": "", "searchResults": []})


def speak(request):
    output = ""
    data = request.POST.get('record')
    import speech_recognition as sr

    error = ""
    # get audio from the microphone
    r = sr.Recognizer()
    for index, name in enumerate(sr.Microphone.list_microphone_names()):
        print("Microphone with name \"{1}\" found for `Microphone(device_index={0})`".format(index, name))
    with sr.Microphone() as source:
        print("Going to Listen")
        audio = r.listen(source, timeout=1, phrase_time_limit=10)
        print("Listening Finished")
    try:
        output = r.recognize_google(audio) + " "
        service = build("customsearch", "v1", developerKey=my_api_key)
        res = service.cse().list(q=output, cx=my_cse_id, num=3).execute()
        results = res['items']
    except sr.UnknownValueError:
        error = "Couldn't hear anything. Please speak a little loud and clear"
        return render(request, 'home.html', {"result": data, "error": error})
    except sr.RequestError as e:
        error = "Couldn't hear anything. Please speak a little loud and clear"
        return render(request, 'home.html', {"result": data, "error": error})
    data = output
    return render(request, 'home.html', {"result": data, "error": error, "searchResults": results})

# def search(request):
#     service = build("customsearch", "v1", developerKey=my_api_key)
#     res = service.cse().list(q="lcwu", cx=my_cse_id, num=3).execute()
#     results = res['items']
#     return render(request, 'home.html', {"result": "", "error": "", "searchResults": results})

def result(request):
    link = request.GET.get('link', None)
    title = request.GET.get('title', None)
    snippet = request.GET.get('snippet', None)
    return render(request, 'result.html', {"link": link, "title": title, "snippet": snippet})
