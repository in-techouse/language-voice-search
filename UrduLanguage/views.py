from django.shortcuts import render


def home(request):
    return render(request, 'home.html', {"result": "", "error": ""})


def speak(request):
    output = ""
    data = request.POST.get('record')
    import speech_recognition as sr

    error = ""
    # get audio from the microphone
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Speak:")
        audio = r.listen(source)

    try:
        output = " " + r.recognize_google(audio)
    except sr.UnknownValueError:
        error = "Couldn't hear anything. Please speak a little loud and clear"
    except sr.RequestError as e:
        error = "Couldn't hear anything. Please speak a little loud and clear"
    data = output
    return render(request, 'home.html', {"result": data, "error": error})


def results(request):
    return render(request, 'results.html')
