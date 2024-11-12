
import os
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from .models import Apartment
from .serializers import ApartmentSerializer
from .filters import ApartmentFilter
from django.utils.crypto import get_random_string
from django.core.files.uploadedfile import UploadedFile
from rest_framework.pagination import PageNumberPagination



class IsOwnerUser(BasePermission):
    """
    Custom permission to only allow owners to edit or delete.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and an owner
        return request.user and request.user.is_authenticated and request.user.user_type == 'owner'

    def has_object_permission(self, request, view, obj):
        # Check that the user is the owner of the apartment
        return obj.owner == request.user




class CustomPageNumberPagination(PageNumberPagination):
    page_size = 5  # Display 5 objects per page
    page_size_query_param = 'page_size'  # Allow client to override, using a query parameter of their choice
    max_page_size = 100  # Maximum limit allowed when using `page_size` query parameter

    def get_paginated_response(self, data):
        return Response({
            'links': {
               'next': self.get_next_link(),
               'previous': self.get_previous_link()
            },
            'total': self.page.paginator.count,
            'page': int(self.request.GET.get(self.page_query_param, 1)),
            'page_size': int(self.request.GET.get(self.page_size_query_param, self.page_size)),
            'results': data
        })



class ApartmentListView(generics.ListAPIView):
    queryset = Apartment.objects.order_by('id')  # Ensure consistent ordering

    serializer_class = ApartmentSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ApartmentFilter
    pagination_class = CustomPageNumberPagination  # Use the custom pagination class


    @extend_schema(
        parameters=[
            OpenApiParameter(name='min_price', description=_('Minimum price'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='max_price', description=_('Maximum price'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='min_rooms', description=_('Minimum rooms'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='max_rooms', description=_('Maximum rooms'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='min_beds', description=_('Minimum beds'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='max_beds', description=_('Maximum beds'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='min_bathrooms', description=_('Minimum bathrooms'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='max_bathrooms', description=_('Maximum bathrooms'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='min_floor_number', description=_('Minimum floor number'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='max_floor_number', description=_('Maximum floor number'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='min_size', description=_('Minimum size'), required=False, type=OpenApiTypes.NUMBER),
            OpenApiParameter(name='max_size', description=_('Maximum size'), required=False, type=OpenApiTypes.NUMBER),
            # OpenApiParameter(name='page', type=int, location=OpenApiParameter.QUERY, required=False, description='Page number in the paginated result set.',),
            OpenApiParameter(name='page_size', type=int, location=OpenApiParameter.QUERY, required=False, description='Number of results to return per page.',),
            
        
            
            # You can add more parameters here
        ]
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)



class OwnerApartmentsListView(generics.ListAPIView):
    serializer_class = ApartmentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None  # This line disables pagination


    def get_queryset(self):
        # Return only the apartments that belong to the authenticated user (owner)
        return Apartment.objects.filter(owner=self.request.user)



class ApartmentCreateView(generics.CreateAPIView):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [IsOwnerUser]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, status='pending')



class ApartmentDetailView(generics.RetrieveAPIView):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        apartment = get_object_or_404(Apartment, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, apartment)
        return apartment



class ApartmentDeleteView(generics.DestroyAPIView):
    queryset = Apartment.objects.all()
    permission_classes = [IsOwnerUser]

    def delete(self, request, *args, **kwargs):
        response = super().delete(request, *args, **kwargs)
        # Check if the deletion was successful
        if response.status_code == status.HTTP_204_NO_CONTENT:
            return Response({"detail": "Apartment deleted successfully."}, status=status.HTTP_200_OK)
        return response
    
    



class ApartmentCreateView(generics.CreateAPIView):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [IsOwnerUser]

    def perform_create(self, serializer):
        # Save the apartment instance
        apartment = serializer.save(owner=self.request.user)

        # Handle photo upload
        files = self.request.FILES.getlist('photos')
        if not files:
            return Response({'error': 'No photos uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create ApartmentPhoto instances for each uploaded file
        photo_instances = []
        for file in files:
            # Generate a unique filename
            unique_filename = self.generate_unique_filename(file.name)
            # Limit filename length to avoid very long names
            limited_filename = unique_filename[:100]  # Adjust the limit as needed
            # Create a new UploadedFile object with the modified filename
            modified_file = UploadedFile(file, name=limited_filename)
            # Create ApartmentPhoto instance and save it
            photo_instance = ApartmentPhoto(apartment=apartment, photo=modified_file)
            photo_instance.save()
            photo_instances.append(photo_instance)

        # Serialize the saved photo instances to return them in the response
        photo_serializer = ApartmentPhotoSerializer(photo_instances, many=True)
        photos_data = photo_serializer.data

        # Include photos data in the response
        response_data = serializer.data
        response_data['photos'] = photos_data
        return Response(response_data, status=status.HTTP_201_CREATED)

    def generate_unique_filename(self, original_filename):
        # Generate a unique filename using a random string
        random_string = get_random_string(length=10)
        filename, extension = os.path.splitext(original_filename)
        return f"{filename}_{random_string}{extension}"






class ApartmentUpdateView(generics.UpdateAPIView):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [IsOwnerUser]

    def perform_update(self, serializer):
        apartment = serializer.save()

        files = self.request.FILES.getlist('photos')
        photo_ids_to_update = self.request.data.getlist('photo_ids')

        if files and photo_ids_to_update:
            if len(files) != len(photo_ids_to_update):
                return Response({'error': 'Number of files and photo IDs must match.'}, status=status.HTTP_400_BAD_REQUEST)

            for file, photo_id in zip(files, photo_ids_to_update):
                try:
                    photo_instance = ApartmentPhoto.objects.get(id=photo_id, apartment=apartment)
                    unique_filename = self.generate_unique_filename(file.name)
                    limited_filename = unique_filename[:100]
                    modified_file = UploadedFile(file, name=limited_filename)
                    photo_instance.photo = modified_file
                    photo_instance.save()
                except ApartmentPhoto.DoesNotExist:
                    return Response({'error': f'Photo with ID {photo_id} does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

            photo_serializer = ApartmentPhotoSerializer(ApartmentPhoto.objects.filter(apartment=apartment), many=True)
            photos_data = photo_serializer.data

            response_data = serializer.data
            response_data['photos'] = photos_data
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_200_OK)

    def generate_unique_filename(self, original_filename):
        random_string = get_random_string(length=10)
        filename, extension = os.path.splitext(original_filename)
        return f"{filename}_{random_string}{extension}"






class SaveApartmentView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        apartment_id = kwargs.get('pk')
        apartment = get_object_or_404(Apartment, id=apartment_id)
        saved_apartment, created = SavedApartment.objects.get_or_create(
            user=request.user,
            apartment=apartment
        )
        if created:
            return Response({'status': 'Apartment saved'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'status': 'Apartment already saved'}, status=status.HTTP_400_BAD_REQUEST)


class RemoveSavedApartmentView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        apartment_id = kwargs.get('pk')
        saved_apartment = get_object_or_404(SavedApartment, user=request.user, apartment__id=apartment_id)
        saved_apartment.delete()
        return Response({'status': 'Apartment unsaved'}, status=status.HTTP_204_NO_CONTENT)
