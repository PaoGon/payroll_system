from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register(r'create-payroll', PayrollView, basename='payroll')

urlpatterns = [
    path('employee-list', EmployeeView.as_view()),
    path('create-employee', CreateEmployeeView.as_view()),
    path('search-employee', SearchEmployee.as_view()),
    path('delete-employee', DeleteEmployee.as_view()),
    path('update-employee', UpdateEmployee.as_view()),
    path('', include(router.urls)),
]
