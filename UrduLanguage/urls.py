"""UrduLanguage URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from . import views
from . import auth
from . import admin

urlpatterns = [
    # Main Routes of application
    url(r"^$", views.home, name="/"),
    url(r"^speak/", views.speak, name="speak"),
    url(r"^searchResults/", views.searchResults, name="searchResults"),
    url(r"^textToSpeech/", views.textToSpeech, name="textToSpeech"),
    url(r"^result/", views.result, name="result"),

    # Admin Login and Forgot Password Routes
    url(r"^login/", auth.login, name="login"),
    url(r"^forgotPassword/", auth.forgotPassword, name="forgotPassword"),
    url(r"^logout/", auth.logout, name="logout"),


    # Admin Dashboard Routes
    url(r"^allDataSet/", admin.allDataSet, name="allDataSet"),
    url(r"^addDataSet/", admin.addDataSet, name="addDataSet"),
    url(r"^deleteDataSet/", admin.deleteDataSet, name="deleteDataSet"),
    url(r"^editDataSet/", admin.editDataSet, name="editDataSet"),
]
