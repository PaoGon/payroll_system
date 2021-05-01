from rest_framework import serializers
from .models import Employee, Payroll


# payroll model serializer
class CreatePayroolSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Payroll
        fields = ('url', 'id', 'allowances', 'cash_advance', 'holiday_pay')

# Employee model serializers


class EmployeeSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='payroll-detail',
    )

    class Meta:
        model = Employee
        fields = ('url', 'id', 'employee_id', 'name', 'surname', 'middlename', 'status', 'position',
                  'employement_type', 'fixed_rate', 'sss_id', 'tin_num', 'phil_id', 'pagibig_id')


class CreateEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('payroll', 'employee_id', 'name', 'surname', 'middlename', 'status', 'position',
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


# pagination serailaizer
class PayrollPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'name', 'surname', 'middlename', 'position')
