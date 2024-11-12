import django_filters
from .models import Apartment
from django.utils.translation import gettext_lazy as _

class ApartmentFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte', label=_("Minimum price"))
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte', label=_("Maximum price"))
    min_rooms = django_filters.NumberFilter(field_name="rooms", lookup_expr='gte', label=_("Minimum rooms"))
    max_rooms = django_filters.NumberFilter(field_name="rooms", lookup_expr='lte', label=_("Maximum rooms"))
    min_beds = django_filters.NumberFilter(field_name="beds", lookup_expr='gte', label=_("Minimum beds"))
    max_beds = django_filters.NumberFilter(field_name="beds", lookup_expr='lte', label=_("Maximum beds"))
    min_bathrooms = django_filters.NumberFilter(field_name="bathrooms", lookup_expr='gte', label=_("Minimum bathrooms"))
    max_bathrooms = django_filters.NumberFilter(field_name="bathrooms", lookup_expr='lte', label=_("Maximum bathrooms"))
    min_floor_number = django_filters.NumberFilter(field_name="floor_number", lookup_expr='gte', label=_("Minimum floor number"))
    max_floor_number = django_filters.NumberFilter(field_name="floor_number", lookup_expr='lte', label=_("Maximum floor number"))
    
    min_size = django_filters.NumberFilter(field_name="size", lookup_expr='gte', label=_("Minimum size"))
    max_size = django_filters.NumberFilter(field_name="size", lookup_expr='lte', label=_("Maximum size"))
    
    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')
    description = django_filters.CharFilter(field_name='description', lookup_expr='icontains')
    address = django_filters.CharFilter(field_name='address', lookup_expr='icontains')


    # class Meta:
    #     model = Apartment
    #     fields = {
    #         'title': ['icontains'],
    #         'description': ['icontains'],
    #         'address': ['icontains'],

    #     }