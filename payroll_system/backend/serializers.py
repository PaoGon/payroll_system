from django.db.models import fields
from rest_framework import serializers
from .models import Attendace, Employee, Payroll, Payslip


# *user profile serializer
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


# *payroll model serializer
class CreatePayrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payroll
        fields = (
            'employee',
            'id',
            'allowances',
            'cash_advance',
            'holiday_pay',
            'sss_loan',
            'mp2',
            'hdmf_loan'
        )


# *payslip model serializer
class CreatePayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = '__all__'


# *Employee model serializers
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            'id',
            'employee_id',
            'name',
            'surname',
            'middlename',
            'status',
            'position',
            'employement_type',
            'fixed_rate',
            'sss_id',
            'tin_num',
            'phil_id',
            'pagibig_id'
        )


class PayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = (
            'id',
            'gross_salary',
            'total_bonus',
            'deduction',
            'net_pay',
            'date_created',
        )


class PayrollDetailSerializer(serializers.ModelSerializer):
    payslip = PayslipSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Payroll
        fields = (
            'id',
            'allowances',
            'cash_advance',
            'holiday_pay',
            'sss_loan',
            'mp2',
            'hdmf_loan',
            'sss_ee_share',
            'philhealth_ee_share',
            'pagibig_ee_share',
            'payslip',
            'date_created',
        )


class PayrollSerializer(serializers.ModelSerializer):
    payroll = PayrollDetailSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Employee
        fields = (
            'id',
            'name',
            'surname',
            'middlename',
            'fixed_rate',
            'payroll'
        )


class CreateEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            'employee_id',
            'name',
            'surname',
            'middlename',
            'status',
            'position',
            'employement_type',
            'fixed_rate',
            'sss_id',
            'tin_num',
            'phil_id',
            'pagibig_id'
        )


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
        fields = (
            'id',
            'name',
            'surname',
            'middlename',
            'position'
        )


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendace
        fields = (
            'id',
            'employee',
            'late',
            'absent'
        )


class UpdateAttendanceSerializer(serializers.ModelSerializer):
    # late = serializers.BooleanField(required=False)
    # absent = serializers.BooleanField(required=False)
    # time_in = serializers.DateTimeField(required=False)

    class Meta:
        model = Attendace
        fields = (
            'id',
            'time_out'
        )


class AttendanceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendace
        fields = '__all__'
