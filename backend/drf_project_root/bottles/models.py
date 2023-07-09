from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator


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


class Rating(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
    supplier_rating = models.FloatField()
    collector_rating = models.FloatField()

    def __str__(self):
        return (f'{self.user_id} supplier rating is {self.supplier_rating}' +
                f' collector rating is {self.collector_rating}')


class TypeOfGoods (models.Model):
    type_of_goods = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.type_of_goods}'


class Order (models.Model):
    supplier = models.ForeignKey("User",
                                 on_delete=models.CASCADE,
                                 related_name="orders",
                                 blank=False)
    collector = models.ForeignKey("User",
                                  on_delete=models.SET_NULL,
                                  related_name="orderds",
                                  blank=True,
                                  null=True)
    latitude = models.FloatField(
        default=0.0,
        validators=[
            MinValueValidator(-90.0),  # Minimum value constraint
            MaxValueValidator(90.0)  # Maximum value constraint
        ]
    )
    longitude = models.FloatField(
        default=0.0,
        validators=[
            MinValueValidator(0.0),  # Minimum value constraint
            MaxValueValidator(180.0)  # Maximum value constraint
        ]
    )
    house_number = models.CharField(max_length=10, blank=True)
    entrance_number = models.CharField(max_length=10, blank=True)
    floor = models.CharField(max_length=10, blank=True)
    apparment_number = models.CharField(max_length=10, blank=True)
    comments = models.CharField(max_length=1000, blank=True)

    creation_date = models.DateTimeField(auto_now_add=True)

    class Status(models.IntegerChoices):
        IS_OPEN = 1
        IS_ASSIGNED = 2
        IS_TAKEN = 3
        IS_DONE = 4
    status = models.IntegerField(choices=Status.choices, default=1)

    type_of_goods = models.ForeignKey(TypeOfGoods,
                                      on_delete=models.CASCADE,
                                      related_name="orders")
    amount = models.IntegerField()

    def __str__(self):
        return f'{self.amount} {self.type_of_goods} status - {self.status}'


class RecyclePoint(models.Model):

    name = models.CharField(max_length=250)
    # made address section similar to orders to probably
    # make an address table different
    latitude = models.FloatField(
        default=0.0,
        validators=[
            MinValueValidator(-90.0),  # Minimum value constraint
            MaxValueValidator(90.0)  # Maximum value constraint
        ]
    )
    longitude = models.FloatField(
        default=0.0,
        validators=[
            MinValueValidator(0.0),  # Minimum value constraint
            MaxValueValidator(180.0)  # Maximum value constraint
        ]
    )
    house_number = models.CharField(max_length=10, blank=True)
    entrance_number = models.CharField(max_length=10, blank=True)
    floor = models.CharField(max_length=10, blank=True)
    apparment_number = models.CharField(max_length=10, blank=True)
    comments = models.CharField(max_length=1000, blank=True)

    open_time = models.TimeField()
    close_time = models.TimeField()
    types_of_goods = models.ManyToManyField(TypeOfGoods, related_name="points")
