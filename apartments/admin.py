from django.conf import settings
from django.contrib import admin
from django.core.mail import send_mail, get_connection
from .models import Apartment, ApartmentPhoto

class ApartmentPhotoInline(admin.TabularInline):
    model = ApartmentPhoto
    extra = 1  # Number of extra forms to display in the admin interface

class ApartmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'owner', 'address', 'price', 'rooms', 'bathrooms', 'status']
    list_filter = ['owner', 'price', 'status']
    search_fields = ['title', 'address']
    inlines = [ApartmentPhotoInline]
    actions = ['approve_apartments', 'deny_apartments']

    def approve_apartments(self, request, queryset):
        queryset.update(status='published')
        for apartment in queryset:
            self.send_approval_email(apartment)
        self.message_user(request, "Selected apartments have been approved and emails have been sent.")

    def deny_apartments(self, request, queryset):
        queryset.update(status='denied')
        for apartment in queryset:
            self.send_denial_email(apartment)
        self.message_user(request, "Selected apartments have been denied and emails have been sent.")

    def send_approval_email(self, apartment):
        self.send_email(
            'Your Apartment Has Been Approved',
            f'Congratulations! Your apartment "{apartment.title}" has been approved and is now published on our platform.',
            apartment.owner.email
        )

    def send_denial_email(self, apartment):
        self.send_email(
            'Your Apartment Has Been Denied',
            f'We regret to inform you that your apartment "{apartment.title}" has been denied. Please review our guidelines and make necessary adjustments before resubmitting.',
            apartment.owner.email
        )

    def send_email(self, subject, message, recipient_email):
        connection = get_connection(
            host=settings.EMAIL_HOST,
            port=settings.EMAIL_PORT,
            username=settings.NO_REPLY_EMAIL_HOST_USER,
            password=settings.NO_REPLY_EMAIL_HOST_PASSWORD,
            use_tls=True,
        )
        send_mail(
            subject,
            message,
            settings.NO_REPLY_EMAIL_HOST_USER,
            [recipient_email],
            connection=connection,
            fail_silently=False,
        )

    approve_apartments.short_description = "Approve selected apartments"
    deny_apartments.short_description = "Deny selected apartments"

admin.site.register(Apartment, ApartmentAdmin)
