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


def allDataSet(request):
    if not request.session.has_key('id'):
        return redirect("/login")
    allDataSet = database.child("DataSet").order_by_key().get()
    listDataSet = []
    for data in allDataSet.each():
        listDataSet.append(data.val())
    return render(request, "admin/allDataSet.html", {"listDataSet": listDataSet})

def addDataSet(request):
    if not request.session.has_key('id'):
        return redirect("/login")
    if request.method == "GET":
        return render(request, "admin/addDataSet.html")
    elif request.method == "POST":
        englishText = request.POST.get("englishText")
        urduText = request.POST.get("urduText")
        id = calendar.timegm(time.gmtime())
        dataSet = {
            "id": str(id),
            "englishText": englishText,
            "urduText": urduText
        }
        database.child("DataSet").child(id).set(dataSet)
        return render(request, "admin/addDataSet.html", {"success" : 1})

def editDataSet(request):
    if not request.session.has_key('id'):
        return redirect("/login")
    if request.method == "GET":
        id = request.GET.get('id', None)
        if id == None:
            return redirect("/allDataSet")
        dataSet = database.child("DataSet").child(id).get()
        dataSet = dataSet.val()
        return render(request, "admin/editDataSet.html", {"dataSet": dataSet})
    elif request.method == "POST":
        englishText = request.POST.get("englishText")
        urduText = request.POST.get("urduText")
        dataSetId = request.POST.get("id")
        dataSet = {
            "id": dataSetId,
            "englishText": englishText,
            "urduText": urduText
        }
        database.child("DataSet").child(dataSetId).set(dataSet)
        return redirect("/allDataSet")

def deleteDataSet(request):
    if not request.session.has_key('id'):
        return redirect("/login")
    id = request.GET.get('id', None)
    if id == None:
        return redirect("/allDataSet")
    database.child("DataSet").child(id).remove()
    return redirect("/allDataSet")