from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'employee_id', 'name', 'surname', 'middlename', 'status', 'position', 
        'employement_type', 'fixed_rate', 'sss_id', 'tin_num', 'phil_id', 'pagibig_id')


class CreateEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('employee_id', 'name', 'surname', 'middlename', 'status', 'position', 
        'employement_type', 'fixed_rate', 'sss_id', 'tin_num', 'phil_id', 'pagibig_id')