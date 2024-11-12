from rest_framework import serializers
from .models import Apartment, ApartmentPhoto, SavedApartment
from django.utils.timezone import localtime
from rest_framework import serializers
from .models import ApartmentPhoto



class ApartmentPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApartmentPhoto
        fields = ['id', 'apartment', 'photo']
        read_only_fields = ['id', 'apartment']

    def to_representation(self, instance):

        representation = super().to_representation(instance)
        added_at = localtime(instance.added_at)  # Ensure correct timezone
        representation['added_at'] = added_at.strftime('%Y-%m-%d %I:%M:%S %p')
        return representation

  


class ApartmentSerializer(serializers.ModelSerializer):
    photos = ApartmentPhotoSerializer(many=True, read_only=True)
    owner_username = serializers.ReadOnlyField(source='owner.username')  # Display the owner's username
    owner_phone_number = serializers.SerializerMethodField()
    owner_email = serializers.SerializerMethodField()
    status = serializers.ReadOnlyField()  # Ensure the status is included in the serialized output


    class Meta:
        model = Apartment
        fields = '__all__'
        read_only_fields = ('owner_username', 'owner', 'owner_phone_number', 'owner_email')
        
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Format datetime fields
        added_date = localtime(instance.added_date)  # Ensure correct timezone
        updated_date = localtime(instance.updated_date)  # Ensure correct timezone
        ret['added_date'] = added_date.strftime('%Y-%m-%d %I:%M:%S %p')
        ret['updated_date'] = updated_date.strftime('%Y-%m-%d %I:%M:%S %p')
        return ret
    
    def get_owner_phone_number(self, obj):
        return obj.owner.phone_number

    def get_owner_email(self, obj):
        return obj.owner.email
    
    


class SavedApartmentSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = SavedApartment
        fields = ['id', 'user', 'apartment', 'saved_at']
        read_only_fields = ['id', 'saved_at']
