from django.urls import path, include
from rest_framework import routers
from .views import *


urlpatterns = [
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('register-user', CreateAccount.as_view()),
    path('csrf_cookie', GetCsrfToken.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteAccountView.as_view()),
]
