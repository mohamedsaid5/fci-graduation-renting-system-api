from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, RegexValidator
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


class Apartment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('published', 'Published'),
        ('denied', 'Denied'),
    ]
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    title = models.CharField(_("title"), max_length=255)
    description = models.TextField(_("description"))
    address = models.CharField(_("address"), max_length=255)
    price = models.DecimalField(_("price"), max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    rooms = models.IntegerField(_("rooms"), validators=[MinValueValidator(1)])
    size = models.DecimalField(_("size"), max_digits=6, decimal_places=2, validators=[MinValueValidator(0)])
    beds = models.IntegerField(_("beds"), validators=[MinValueValidator(1)])
    bathrooms = models.IntegerField(_("bathrooms"), validators=[MinValueValidator(1)])
    view = models.CharField(_("view"), max_length=255, blank=True)
    finishing_type = models.CharField(_("finishing type"), max_length=255)
    floor_number = models.IntegerField(_("floor number"))
    year_of_construction = models.IntegerField(_("year of construction"))
    added_date = models.DateTimeField(_("added date"), auto_now_add=True)
    updated_date = models.DateTimeField(_("updated date"), auto_now=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_("owner"), related_name='apartments', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
    @property
    def owner_phone_number(self):
        """Returns the phone number of the apartment's owner."""
        return self.owner.phone_number

    @property
    def owner_email(self):
        """Returns the email of the apartment's owner."""
        return self.owner.email
    
    
    

class ApartmentPhoto(models.Model):
    apartment = models.ForeignKey('Apartment', related_name='photos', on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='apartment_photos/')
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for apartment {self.apartment.id}"






class SavedApartment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='saved_apartments')
    apartment = models.ForeignKey('Apartment', on_delete=models.CASCADE, related_name='saved_by_users')
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'apartment')  # Prevents the same apartment from being saved multiple times by the same user


    def __str__(self):
        return f"{self.user} saved {self.apartment}"



