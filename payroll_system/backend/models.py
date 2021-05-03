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


def calc_sss():
    sss = Employee.objects.get(fixed_rate)
    print(sss, 'hello')
    if sss != 0:
        return (sss)


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
    # payroll = models.ForeignKey(
    #     Payroll,  null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)


class Payroll(models.Model):
    employee = models.ForeignKey(
        Employee, related_name='payroll', null=True, blank=True, on_delete=models.CASCADE)
    allowances = models.IntegerField(null=True, blank=True, default=0)
    cash_advance = models.IntegerField(null=True, blank=True, default=0)
    holiday_pay = models.IntegerField(null=True, blank=True, default=0)
    sss = models.CharField(max_length=50, null=True,
                           blank=True, default=calc_sss)
    pagibig = models.IntegerField(null=True, blank=True, default=0)
    philhealth = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.id)


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
