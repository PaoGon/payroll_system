from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics, serializers, status, viewsets
from .serializers import (
    EmployeeSerializer,
    CreateEmployeeSerializer,
    UpdateEmployeeSerializer,
    CreatePayrollSerializer,
    PayrollPageSerializer,
    PayrollSerializer,
    CreatePayslipSerializer,
    PayrollDetailSerializer,
    AttendanceSerializer,
    UpdateAttendanceSerializer,
    AttendanceListSerializer
)

from .models import Attendace, Employee, Payroll, Payslip
from .pagination import PageNumberPagination
from django.contrib.auth.models import User


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import filters


# Create your views here.
# * get User profile
class GetUserProfileView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        username = user.username

        user = User.objects.get(id=user.id)

        user_profile = Employee.objects.get(user=user)
        user_profile = PayrollSerializer(user_profile)

        if user.is_staff:

            return Response({
                'profile': user_profile.data,
                'username': str(username),
                'status': 'admin'
            })

        else:

            return Response({
                'profile': user_profile.data,
                'username': str(username),
                'status': 'user'
            })


# * Employee page api views
class EmployeeView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class PayrollView(viewsets.ModelViewSet):
    queryset = Payroll.objects.all()
    serializer_class = CreatePayrollSerializer


class PayslipView(viewsets.ModelViewSet):
    queryset = Payslip.objects.all()
    serializer_class = CreatePayslipSerializer


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


class PayrollPageview(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = PayrollPageSerializer
    pagination_class = PageNumberPagination


class SampleView(generics.ListAPIView):
    queryset = Employee.objects.get_queryset().order_by('id')
    serializer_class = PayrollSerializer


class AttendanceView(APIView):
    queryset = Attendace.objects.all()
    serializer_class = AttendanceSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': 'Attendance Recorded Successfully',
                'id': serializer.data['id']
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateAttendanceView(APIView):

    serializer_class = UpdateAttendanceSerializer
    lookup_url_kwarg = 'id'

    def put(self, request, format=None):
        print('this is the rquest: ', request)

        id = request.GET.get(self.lookup_url_kwarg)
        snippet = Attendace.objects.get(id=id)
        serializer = self.serializer_class(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response({'success': 'Time out successfully submitted', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'Invalid Request: Bad Request'}, status=status.HTTP_400_BAD_REQUEST)


class AttendanceListView(generics.ListAPIView):
    queryset = Attendace.objects.all()
    serializer_class = AttendanceListSerializer
