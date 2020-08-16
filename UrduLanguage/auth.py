from django.shortcuts import render, redirect
import pyrebase
import calendar
import time

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


def login(request):
    if request.session.has_key('id'):
        return redirect("/allDataSet")
    if request.method == "GET":
        return render(request, "auth/login.html", {"error": ""})
    elif request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = auth.sign_in_with_email_and_password(email, password)
            print("Login Success")
            request.session['id'] = email
            return redirect("/allDataSet")
        except:
            print("Login Fail")
            message = 'Email or password is incorrect'
            print(message)
            return render(request, "auth/login.html", {"error": message})


def forgotPassword(request):
    if request.session.has_key('id'):
        return redirect("/allDataSet")
    if request.method == "GET":
        return render(request, "auth/forgotPassword.html", {"error": "", "success": ""})
    elif request.method == "POST":
        email = request.POST.get('email')
        try:
            auth.send_password_reset_email(email)
            message = 'A password recovery email has been sent to your account email. Follow the instructions to reset your password.'
            return render(request, "auth/forgotPassword.html", {"error": "", "success": message})
        except:
            message = 'The e-mail is not registered. Please enter the email associated with your account.'
            return render(request, "auth/forgotPassword.html", {"error": message, "success": ""})

def logout(request):
    if not request.session.has_key('id'):
        return redirect("/")
    request.session.clear()
    return redirect("/login")