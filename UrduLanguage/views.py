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
    for index, name in enumerate(sr.Microphone.list_microphone_names()):
        print("Microphone with name \"{1}\" found for `Microphone(device_index={0})`".format(index, name))
    with sr.Microphone() as source:
        print("Going to Listen")
        audio = r.listen(source, timeout=1, phrase_time_limit=10)
        print("Listening Finished")
    try:
        print("I'm in try")
        # output = "" + r.adjust_for_ambient_noise(audio, duration = 1)
        output = " " + r.recognize_google(audio)
        # output = r.adjust_for_ambient_noise(audio, duration=5)
    except sr.UnknownValueError:
        error = "Couldn't hear anything. Please speak a little loud and clear"
    except sr.RequestError as e:
        error = "Couldn't hear anything. Please speak a little loud and clear"
    data = output
    return render(request, 'home.html', {"result": data, "error": error})


def results(request):
    return render(request, 'results.html')
