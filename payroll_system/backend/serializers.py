from rest_framework import serializers
from .models import Employee, Payroll


# payroll model serializer
class CreatePayroolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payroll
        fields = ('employee', 'id', 'allowances',
                  'cash_advance', 'holiday_pay')

# Employee model serializers


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'employee_id', 'name', 'surname', 'middlename', 'status', 'position',
                  'employement_type', 'fixed_rate', 'sss_id', 'tin_num', 'phil_id', 'pagibig_id')


class PayrollSerializer(serializers.ModelSerializer):
    payroll = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='payroll-detail'
    )

    class Meta:
        model = Employee
        fields = ('id', 'name', 'surname',
                  'middlename', 'fixed_rate', 'payroll')


class CreateEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('employee_id', 'name', 'surname', 'middlename', 'status', 'position',
                  'employement_type', 'fixed_rate', 'sss_id', 'tin_num', 'phil_id', 'pagibig_id')


class UpdateEmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    surname = serializers.CharField(required=False)
    middlename = serializers.CharField(required=False)
    status = serializers.CharField(required=False)
    position = serializers.CharField(required=False)
    employement_type = serializers.CharField(required=False)
    fixed_rate = serializers.IntegerField(required=False)
    sss_id = serializers.CharField(required=False)
    tin_num = serializers.CharField(required=False)
    phil_id = serializers.CharField(required=False)
    pagibig_id = serializers.CharField(required=False)
    payroll = serializers.CharField(required=False)

    class Meta:
        model = Employee
        fields = '__all__'


# *pagination serailaizer
class PayrollPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'name', 'surname', 'middlename', 'position')
