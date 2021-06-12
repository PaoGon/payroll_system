from django.db import models
from django.contrib.auth.models import User

import random
import string


def gen_emp_id():
    length = 8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Employee.objects.filter(employee_id=code).count() == 0:
            break

    return code


def calc_phil_health(fixed_rate):

    shares = {
        'ee': 0,
        'er': 0
    }

    if fixed_rate <= 10000.00:
        shares['ee'] = 350 / 2
        shares['er'] = 350 / 2

        return shares

    elif fixed_rate >= 10000.01:
        shares['ee'] = (fixed_rate*0.035)/2
        shares['er'] = (fixed_rate*0.035)/2

        return shares


def calc_sss_share(fixed_rate):

    shares = {
        'ee': 0,
        'er': 0
    }

    init = 3250.00
    final = 3749.99

    sss_er_share = 307.50
    sss_ee_share = 157.50

    if fixed_rate <= 3250.00:
        shares['er'] = 265.00
        shares['ee'] = 135.00

        return shares

    while True:
        if init <= fixed_rate <= final:
            shares['ee'] = sss_ee_share
            shares['er'] = sss_er_share

            return shares

        init += 500
        final += 500

        sss_ee_share += 22.5

        if sss_er_share == 1242.50:
            sss_er_share += 62.5
        else:
            sss_er_share += 42.5


def comp_payslip(fixed_rate, loan, cont, allowance, holiday_pay):
    gross_salary = fixed_rate
    total_cont = cont['sss'] + cont['pg'] + cont['ph']

    tax = gross_salary - total_cont

    total_loan = loan['sss_loan'] + loan['mp2'] + loan['hdmf'] + loan['cash']

    total_deduction = tax - total_loan

    net_pay = total_deduction + allowance + holiday_pay

    pay = {
        'gross_salary': gross_salary,
        'deduction': total_deduction,
        'net_pay': net_pay,
        'bonus': holiday_pay
    }

    return pay


class Employee(models.Model):
    user = models.OneToOneField(
        User, null=True, blank=True, on_delete=models.CASCADE)

    employee_id = models.CharField(
        "ID", unique=True, max_length=8, default=gen_emp_id)

    name = models.CharField("Name", max_length=50, default='*')

    surname = models.CharField(
        "Surname", max_length=20, default='*')

    middlename = models.CharField("Midlename", max_length=20, default='*')
    status = models.CharField("Status", max_length=10, default='*')
    position = models.CharField("Position", max_length=50, default='*')
    employement_type = models.CharField(
        "Employement type", max_length=50, default='*')
    fixed_rate = models.IntegerField(default=0)
    sss_id = models.CharField("sss_id", max_length=30, default='*')
    tin_num = models.CharField("tin_num", max_length=30, default='*')
    phil_id = models.CharField("phil_id", max_length=30, default='*')
    pagibig_id = models.CharField("pagibig_id", max_length=30, default='*')
    # payroll = models.ForeignKey(
    #     Payroll,  null=True, blank=True, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):

        self.name = self.user.first_name
        self.surname = self.user.last_name

        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.id)


class Payroll(models.Model):
    employee = models.ForeignKey(
        Employee, related_name='payroll', null=True, blank=True, on_delete=models.CASCADE)
    allowances = models.DecimalField(
        null=True, blank=True, max_digits=7, decimal_places=2, default=0)
    cash_advance = models.DecimalField(
        null=True, blank=True, max_digits=7, decimal_places=2, default=0)
    holiday_pay = models.DecimalField(
        null=True, blank=True, max_digits=7, decimal_places=2, default=0)
    sss_loan = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    mp2 = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    hdmf_loan = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    sss_er_share = models.DecimalField(
        null=True, blank=True, max_digits=7, decimal_places=2, default=0)
    sss_ee_share = models.DecimalField(
        null=True, blank=True, max_digits=7, decimal_places=2, default=0)
    pagibig_er_share = models.DecimalField(
        null=True, blank=True, max_digits=7, decimal_places=2, default=0)
    pagibig_ee_share = models.DecimalField(
        null=True, blank=True, max_digits=7, decimal_places=2, default=0)
    philhealth_er_share = models.DecimalField(
        null=True, blank=True, max_digits=7, decimal_places=2, default=0)
    philhealth_ee_share = models.DecimalField(
        null=True, blank=True, max_digits=7, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        fixed_rate = self.employee.fixed_rate

        share = calc_sss_share(fixed_rate)
        ph = calc_phil_health(fixed_rate)

        self.sss_ee_share = share['ee']
        self.sss_er_share = share['er']

        self.philhealth_ee_share = ph['ee']
        self.philhealth_er_share = ph['er']

        self.pagibig_ee_share = 100
        self.pagibig_er_share = 100

        super().save(*args, **kwargs)

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
        Payroll, related_name='payslip', null=True, blank=True, on_delete=models.CASCADE)
    gross_salary = models.DecimalField(
        max_digits=7, decimal_places=2, default=0)
    total_bonus = models.DecimalField(
        max_digits=7, decimal_places=2, default=0)
    deduction = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    net_pay = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        fixed_rate = self.payroll.employee.fixed_rate
        allowance = self.payroll.allowances
        holiday_pay = self.payroll.holiday_pay
        loan = {
            'sss_loan': self.payroll.sss_loan,
            'mp2': self.payroll.mp2,
            'hdmf': self.payroll.hdmf_loan,
            'cash': self.payroll.cash_advance,
        }
        print(loan)

        cont = {
            'sss': self.payroll.sss_ee_share,
            'pg': self.payroll.pagibig_ee_share,
            'ph': self.payroll.philhealth_ee_share,
        }

        print(cont)
        data = comp_payslip(fixed_rate, loan, cont, allowance, holiday_pay)

        self.gross_salary = data['gross_salary']
        self.total_bonus = data['bonus']
        self.deduction = data['deduction']
        self.net_pay = data['net_pay']

        print(data)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.payroll.employee.name


class Expenses(models.Model):
    employer_shares = models.ForeignKey(
        Payroll, null=True, blank=True, on_delete=models.CASCADE)
    gross_sallary = models.IntegerField()
    sss_share = models.IntegerField()
    pagibig_share = models.IntegerField()
    philhealth_share = models.IntegerField()

    def __str__(self):
        return self.employer_shares.employee.employee_id
