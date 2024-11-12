from django.urls import path
from django.conf.urls.i18n import i18n_patterns
from django.urls import path
from .views import (ApartmentListView,
                    ApartmentCreateView,
                    # ApartmentPhotosUploadView,
                    ApartmentDetailView,
                    ApartmentDeleteView,
                    ApartmentUpdateView,
                    SaveApartmentView,
                    RemoveSavedApartmentView,
                    OwnerApartmentsListView,
                    )




urlpatterns = [
    path('apartments/', ApartmentListView.as_view(), name='apartment-list-create'),
    path('apartments/owner-apartments/', OwnerApartmentsListView.as_view(), name='owner-apartments'),

    path('apartments/create/', ApartmentCreateView.as_view(), name='apartment-list-create'),
    # path('apartments/<int:pk>/upload_photos/', ApartmentPhotosUploadView.as_view(), name='apartment-photo-upload'),
    path('apartments/<int:pk>/', ApartmentDetailView.as_view(), name='apartment-detail'),

    path('apartments/<int:pk>/delete/', ApartmentDeleteView.as_view(), name='apartment-delete'),
    path('apartments/<int:pk>/update/', ApartmentUpdateView.as_view(), name='apartment-delete'),
    
    
    path('apartments/<int:pk>/save/', SaveApartmentView.as_view(), name='save_apartment'),
    path('saved_apartments/<int:pk>/remove/', RemoveSavedApartmentView.as_view(), name='remove_saved_apartment'),

    # path('my-view/', MyAPIView.as_view(), name='my_api_view'),

]
