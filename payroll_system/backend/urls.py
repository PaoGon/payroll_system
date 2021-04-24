from django.urls import path
from .views import EmployeeView, CreateEmployeeView, SearchEmployee, DeleteEmployee, UpdateEmployee, PayrollView

urlpatterns = [
    path('api', EmployeeView.as_view()),
    path('create-employee', CreateEmployeeView.as_view()),
    path('search-employee', SearchEmployee.as_view()),
    path('delete-employee', DeleteEmployee.as_view()),
    path('update-employee', UpdateEmployee.as_view()),
    path('create-payroll', PayrollView.as_view()),
]
