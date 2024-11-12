# from django.contrib.auth.models import AbstractUser
# from django.db import models
# from django.core.validators import RegexValidator
# from django.utils.translation import gettext_lazy as _

# class CustomUser(AbstractUser):
#     USER_TYPES = (
#         ('student', 'Student'),
#         ('owner', 'Owner'),
#     )
    
#     phone_regex = RegexValidator(
#     regex=r'^\+?20?1[0125][0-9]{8}$',
#     message="Phone number must be entered in the format: '+201xxxxxxxxx'. Up to 11 digits allowed."
#     )
#     national_id_regex = RegexValidator(
#     regex=r'^\d{14}$',
#     message="National ID must be exactly 14 digits long."
#     )
#     user_type = models.CharField(max_length=7, choices=USER_TYPES, default='student')
#     avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, max_length=255)
#     phone_number = models.CharField(validators=[phone_regex], max_length=13, blank=True)
#     address = models.TextField(null=True, blank=True)
#     birth_governorate = models.CharField(_("birth_governorate"), max_length=100, blank=True, null=True)
#     national_id = models.CharField(validators=[national_id_regex], max_length=14, unique=True, null=True, blank=True) #3011 2231 3006 16
#     birth_date = models.DateField(blank=True, null=True)
#     gender = models.CharField(max_length=10, blank=True, null=True)
#     # Add other fields here...

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    USER_TYPES = (
        ('student', _('Student')),
        ('owner', _('Owner')),
    )
    
    GENDER_CHOICES = (
        ('male', _('Male')),
        ('female', _('Female')),

    )

    phone_regex = RegexValidator(
        regex=r'^\+?20?1[0125][0-9]{8}$',
        message=_("Phone number must be entered in the format: '+201xxxxxxxxx'. Up to 11 digits allowed.")
    )
    national_id_regex = RegexValidator(
        regex=r'^\d{14}$',
        message=_("National ID must be exactly 14 digits long.")
    )
    
    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPES,
        default='student',
        verbose_name=_("user type")
    )
    avatar = models.ImageField(
        upload_to='avatars/',
        null=True,
        blank=True,
        max_length=255,
        verbose_name=_("avatar")
    )
    phone_number = models.CharField(
        validators=[phone_regex],
        max_length=13,
        blank=True,
        verbose_name=_("phone number")
    )
    address = models.TextField(
        blank=True,
        verbose_name=_("address")
    )
    birth_governorate = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name=_("birth governorate")
    )
    national_id = models.CharField(
        validators=[national_id_regex],
        max_length=14,
        unique=True,
        blank=True,
        null= True,
        verbose_name=_("national ID")
    )
    birth_date = models.DateField(
        blank=True,
        null=True,
        verbose_name=_("birth date")
    )
    gender = models.CharField(
        max_length=20,
        choices=GENDER_CHOICES,
        blank=True,
        null=True,
        verbose_name=_("gender")
    )
    
    is_verified = models.BooleanField(
        default=False,
        blank=True,
        null=True,
        verbose_name=_("is_verified")
    )


    def __str__(self):
        return self.username
