from django.db import models
import random
import string


def gen_emp_id():
    length = 8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Employee.objects.filter(employee_id=code).count() == 0:
            break

    return code


class Payroll(models.Model):
    allowances = models.CharField(
        max_length=10, null=True, blank=True, default='')
    cash_advance = models.CharField(
        max_length=10, null=True, blank=True, default='')
    holiday_pay = models.CharField(
        max_length=10, null=True, blank=True, default='')
    sss = models.CharField(max_length=10, null=True, blank=True, default='')
    pagibig = models.CharField(
        max_length=10, null=True, blank=True, default='')
    philhealth = models.CharField(
        max_length=10, null=True, blank=True, default='')

    # def __str__(self):
    #     return string(self.allowances)


class Employee(models.Model):
    employee_id = models.CharField(
        "ID", unique=True, max_length=8, default=gen_emp_id)
    name = models.CharField("Name", max_length=50)
    surname = models.CharField("Surname", max_length=20)
    middlename = models.CharField("Midlename", max_length=20)
    status = models.CharField("Status", max_length=10)
    position = models.CharField("Position", max_length=50)
    employement_type = models.CharField("Employement type", max_length=50)
    fixed_rate = models.IntegerField()
    sss_id = models.CharField("sss_id", max_length=30)
    tin_num = models.CharField("tin_num", max_length=30)
    phil_id = models.CharField("phil_id", max_length=30)
    pagibig_id = models.CharField("pagibig_id", max_length=30)
    payroll = models.ForeignKey(
        Payroll,  null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.employee_id + " " + self.name


class Attendace(models.Model):
    employee = models.ForeignKey(
        Employee, null=True, blank=True, on_delete=models.CASCADE)
    time_in = models.DateField(auto_now_add=True)
    late = models.DateField(auto_now_add=True)
    time_out = models.DateField(auto_now_add=True)
    on_leave = models.BooleanField(default=False)
    absent = models.BooleanField(default=False)

    def __str__(self):
        return self.employee.employee_id


class Payslip(models.Model):
    payroll = models.ForeignKey(
        Payroll, null=True, blank=True, on_delete=models.CASCADE)
    gross_salary = models.IntegerField()
    total_bonus = models.IntegerField()
    deduction = models.IntegerField()
    net_pay = models.IntegerField()

    def __str__(self):
        return self.payroll.employee.employee_id


class Expenses(models.Model):
    employer_shares = models.ForeignKey(
        Payroll, null=True, blank=True, on_delete=models.CASCADE)
    gross_sallary = models.IntegerField()
    sss_share = models.IntegerField()
    pagibig_share = models.IntegerField()
    philhealth_share = models.IntegerField()

    def __str__(self):
        return self.employer_shares.employee.employee_id
