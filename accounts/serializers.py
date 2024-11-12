from django.utils.translation import gettext_lazy as _
# from django.contrib.auth.models import User
from datetime import datetime
import os
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser
from django.core.exceptions import ValidationError
from django.contrib.auth import password_validation
from .models import CustomUser
from django.utils.text import slugify
from apartments.models import Apartment, SavedApartment
from apartments.serializers import ApartmentSerializer




# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     """Custom TokenObtainPairSerializer to add more data to the token response."""
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # Add custom claims
#         token['username'] = user.username
#         return token



class RegisterSerializer(serializers.ModelSerializer):
    User = CustomUser

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'user_type')
        # extra_kwargs = {
        #     'user_type': {'required': True},
        # }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password2': _("Password fields didn't match.")})
        return attrs

    def create(self, validated_data):
        User = CustomUser
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            user_type=validated_data.get('user_type', 'student'),  # Use the provided user_type or default to 'student'

        )

        user.set_password(validated_data['password'])
        user.save()

        return user





class CustomUserSerializer(serializers.ModelSerializer):
    saved_apartments = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'user_type', 'avatar', 'phone_number', 'address', 'is_verified', 'is_active', 'national_id', 'birth_governorate', 'birth_date', 'gender', 'saved_apartments']
        extra_kwargs = {
            'password': {'write_only': True},
            'avatar': {'required': False}
        }

    # def get_saved_apartments(self, obj):
    #     saved_apartments = SavedApartment.objects.filter(user=obj).select_related('apartment')
    #     return ApartmentSerializer(saved_apartments, many=True, context={'request': self.context.get('request')}).data

    def get_saved_apartments(self, obj):
        saved_apartments = SavedApartment.objects.filter(user=obj)
        # You need to serialize the apartment instances, not the SavedApartment instances
        apartments = [saved_apartment.apartment for saved_apartment in saved_apartments]
        return ApartmentSerializer(apartments, many=True, context={'request': self.context.get('request')}).data




class UserUpdateSerializer(serializers.ModelSerializer):
    
    User = CustomUser
    avatar = serializers.ImageField(allow_null=True, required=False)
    email = serializers.EmailField(
        required=False,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'avatar', 'phone_number', 'address')
        extra_kwargs = {
            'username': {'required': False}
        }

    def update(self, instance, validated_data):
        if 'avatar' in validated_data:
            file = validated_data.pop('avatar')
            # Shorten the filename to 100 characters or less
            filename_base, filename_ext = os.path.splitext(file.name)
            new_filename = slugify(filename_base[:95]) + filename_ext  # Limit to 95 chars to accommodate extension
            file.name = new_filename
            
            # If the avatar already exists, delete it to replace with the new file
            if instance.avatar:
                instance.avatar.delete()
            instance.avatar = file

        return super().update(instance, validated_data)



class RequestPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    def validate_email(self, value):
        User = CustomUser
        if not User.objects.filter(email=value).exists():
            raise ValidationError(_("User with this email does not exist"))
        return value



class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True, validators=[validate_password])
    re_new_password = serializers.CharField(required=True)

    def validate(self, data):
        if data['new_password'] != data['re_new_password']:
            raise serializers.ValidationError({"re_new_password": _("Password fields didn't match.")})
        return data






class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[password_validation.validate_password])
    new_password_confirmation = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(_("Old password is not correct"))
        return value

    def validate(self, data):
        if data['new_password'] != data['new_password_confirmation']:
            raise serializers.ValidationError({"new_password_confirmation": _("The two password fields didn't match.")})
        return data

    
    
governorates = {'01': 'Cairo',
                '02': 'Alexandria',
                '03': 'Port Said',
                '04': 'Suez',
                '11': 'Damietta',
                '12': 'Dakahlia',
                '13': 'Ash Sharqia',
                '14': 'Kaliobeya',
                '15': 'Kafr El - Sheikh',
                '16': 'Gharbia',
                '17': 'Monoufia',
                '18': 'El Beheira',
                '19': 'Ismailia',
                '21': 'Giza',
                '22': 'Beni Suef',
                '23': 'Fayoum',
                '24': 'El Menia',
                '25': 'Assiut',
                '26': 'Sohag',
                '27': 'Qena',
                '28': 'Aswan',
                '29': 'Luxor',
                '31': 'Red Sea',
                '32': 'New Valley',
                '33': 'Matrouh',
                '34': 'North Sinai',
                '35': 'South Sinai',
                '88': 'Foreign'}



class NationalIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['national_id', 'birth_date', 'gender', 'birth_governorate']
        extra_kwargs = {
            # 'national_id': {'write_only': True},
            'birth_date': {'read_only': True},
            'gender': {'read_only': True},
            'birth_governorate': {'read_only': True},
            'national_id': {'required': True}
        }

    def validate_national_id(self, value):
        # Assuming validation logic is correct, let's validate and also extract information here
        # If the validation passes, proceed to extract information
        # For simplicity, I'm assuming the function extract_info_from_national_id is defined elsewhere and is correct
        info = extract_info_from_national_id(int(value))
        return info  # Return the extracted information for use in update()

    def update(self, instance, validated_data):
        # Extracted information is received here
        info = validated_data.get('national_id')
        
        instance.birth_date = info['date_of_birth']
        instance.gender = info['gender']
        instance.birth_governorate = info['birth_governorate']
        instance.national_id = str(info['national_id'])
        instance.save()
        return instance



def extract_info_from_national_id(national_id):
    """Simulate extracting info from the national ID."""
    try:
        national_id_str = str(national_id)
        birth_century = int(national_id_str[0])
        birth_year = '20' + national_id_str[1:3] if birth_century == 3 else '19' + national_id_str[1:3]
        birth_month = national_id_str[3:5]
        birth_day = national_id_str[5:7]
        birth_governorate_code = national_id_str[7:9]
        gender_code = int(national_id_str[12])
        print(gender_code)

        birth_date = datetime.strptime(f"{birth_year}-{birth_month}-{birth_day}", "%Y-%m-%d").date()
        gender = "Male" if gender_code % 2 != 0 else "Female"
        birth_governorate = governorates.get(birth_governorate_code, "Unknown")
    except Exception as e:
        # Handle the error by raising a ValidationError or taking another action
        raise ValidationError(f"Invalid format in national ID: {e}")
    
    return {
        'national_id': national_id,
        'date_of_birth': birth_date,
        'gender': gender,
        'birth_governorate': birth_governorate,
    }




class FaceVerificationSerializer(serializers.Serializer):
    nid_image = serializers.ImageField()
    selfie_image = serializers.ImageField()

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    