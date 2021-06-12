from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import redirect, render
from rest_framework import generics, serializers, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RegistrationSerializer

from django.contrib.auth.models import User

from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
# from django.contrib.auth import authenticate, login

# Create your views here.


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        try:
            isAuthenticated = User.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})

            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Somethin went wrong when checking authentication status'})


class CreateAccount(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        data = {}

        if serializer.is_valid():
            serializer.save()
            data['response'] = 'Succesfully registered new user'
            return Response(data, status=status.HTTP_201_CREATED)

        else:
            data = serializer.errors
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return Response({'success': 'User Authenticated', 'username': username})

        else:
            return Response({'error': 'Error Authenticating'})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Logout'})
        except:
            return Response({'error': 'Something went wrong when logging out'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCsrfToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


class DeleteAccountView(APIView):
    lookup_url_kwarg = 'id'

    def delete(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)
        user = self.request.user
        if id != None:
            user = User.objects.filter(id=user.id).delete()
            return Response({'success': 'User is Deleted'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Action Denied'}, status=status.HTTP_400_BAD_REQUEST)
