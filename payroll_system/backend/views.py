from django.shortcuts import render
from rest_framework import generics, status, viewsets
from .serializers import EmployeeSerializer, CreateEmployeeSerializer, UpdateEmployeeSerializer, CreatePayroolSerializer
from .models import Employee, Payroll
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import filters
# Create your views here.


# Employee page api views
class EmployeeView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class PayrollView(viewsets.ModelViewSet):
    queryset = Payroll.objects.all()
    serializer_class = CreatePayroolSerializer


class SearchEmployee(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['surname', 'name', 'middlename',
                     'employee_id', 'employement_type', 'position']


class DeleteEmployee(APIView):
    lookup_url_kwarg = 'id'

    def delete(self, request, fromat=None):
        id = request.GET.get(self.lookup_url_kwarg)
        if id != None:
            employee = Employee.objects.filter(id=id)
            employee.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'Bad Request: Action Denied'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateEmployee(APIView):
    serializer_class = UpdateEmployeeSerializer
    lookup_url_kwarg = 'id'

    def put(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)
        snippet = Employee.objects.get(id=id)
        serializer = self.serializer_class(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'Invalid Request: Bad Request'}, status=status.HTTP_400_BAD_REQUEST)


class CreateEmployeeView(APIView):
    serializer_class = CreateEmployeeSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'Invalid request : Action Denied'}, status=status.HTTP_400_BAD_REQUEST)


# Payroll page api views


# class CreatePayroll(APIView):

#     def post(self, request, format=None):
