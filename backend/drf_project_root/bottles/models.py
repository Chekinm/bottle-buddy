from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    """rewriten in this project, to be able to create
    superuser based on email as auth"""
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users require an email field')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):

    # overriding base user class with our own class having email as username
    # also  doc says that having base user  class redefined allow  us
    # to change it in the future simplier
    # (like  if we would like to add user profile to the base user later it
    # will couse a problem with database, and we will have to fix it manually)

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=255, unique=True)
    username = None
    password = models.CharField(max_length=255, blank=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # fieds prompted when superuser created

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

# ------------------ regular modles part ---------------------------


class Address(models.Model):
    """general table, represent all addresses somewhen entered into DB"""

    appartment = models.CharField(max_length=50)
    house = models.CharField(max_length=50)
    street = models.CharField(max_length=250)
    city = models.CharField(max_length=150)
    country = models.CharField(max_length=150)
    postal_code = models.CharField(max_length=50)
    longitude = models.FloatField()
    latitude = models.FloatField()

    def __str__(self):
        return (f'{self.street}, {self.house}'
                f'{"-"+self.appartment if self.appartment else ""}\n'
                f'{self.postal_code}, {self.country}, {self.city}')


class Supplier(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
    supplier_rating = models.FloatField()

    def __str__(self):
        return f'{self.user_id} rating is {self.supplier_rating}'


class Collector (models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
    collector_rating = models.FloatField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return f'{self.user_id} rating is {self.collector_rating}'


class TypeOfGoods (models.Model):
    type_of_goods = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.type_of_goods}'


class Order (models.Model):
    supplier = models.ForeignKey("Supplier",
                                 on_delete=models.CASCADE,
                                 related_name="orders",
                                 blank=False)
    collector = models.ForeignKey("Collector",
                                  on_delete=models.CASCADE,
                                  related_name="orderds",
                                  blank=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=False)
    creation_date = models.DateTimeField(auto_now_add=True)
    is_assigned = models.BooleanField(default=False)
    is_taken = models.BooleanField(default=False)
    is_done = models.BooleanField(default=False)
    type_of_goods = models.ForeignKey(TypeOfGoods,
                                      on_delete=models.CASCADE,
                                      related_name="orders")
    amount = models.IntegerField()

    def __str__(self):
        return f'{self.amount} {self.type_of_goods} taken - {self.is_taken}'


class RecyclePoint(models.Model):

    name = models.CharField(max_length=250)
    address = models.ForeignKey("Address", on_delete=models.CASCADE)
    open_time = models.TimeField()
    close_time = models.TimeField()
    types_of_goods = models.ManyToManyField(TypeOfGoods, related_name="points")
