
from rest_framework.response import Response
from django.utils.encoding import smart_bytes
from django.conf import settings

from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core.mail import send_mail
from django.urls import reverse
from rest_framework import generics, status
from .serializers import *
# from .tokens import token_generator  # Ensure this points to where you defined CustomPasswordResetTokenGenerator
from django.utils.translation import gettext_lazy as _
from .utils import *
# pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.contrib.auth import get_user_model



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class ApiHomeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({"welcome": _("Welcome to our django api documentation")})



class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)



class ProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get_object(self):
        # Return the current user instance
        return self.request.user


class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['put', 'options']


    def get_object(self):
        # Overriding this method to return the user from the request
        return self.request.user

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)



class PasswordChangeView(generics.GenericAPIView):
    serializer_class = PasswordChangeSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response({"detail": _("Password has been changed successfully")}, status=status.HTTP_200_OK)




class UserDeactivateView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({"detail": "User account has been deleted."}, status=status.HTTP_204_NO_CONTENT)



class PasswordResetView(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                uid = urlsafe_base64_decode(uidb64).decode()
                user = get_user_model().objects.get(pk=uid)
                print(uid, user)
            except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
                user = None

            if user is not None and PasswordResetTokenGenerator().check_token(user, token):
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                return Response({'success': _('Password reset successfully')}, status=status.HTTP_200_OK)

            return Response({'error': _('Invalid link or expired')}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class RequestPasswordResetEmailView(generics.GenericAPIView):
    serializer_class = RequestPasswordResetEmailSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        User = CustomUser
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        uidb64 = urlsafe_base64_encode(smart_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)
        # reset_link = request.build_absolute_uri(
        #     reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
        reset_link = f"http://localhost:3000/reset-password?uidb64={uidb64}&token={token}"

        # )
        send_mail(
            subject="Password Reset Request",
            message=f"Please use the following link to reset your password: {reset_link}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )
        return Response({'success': _('We have sent you a link to reset your password')}, status=status.HTTP_200_OK)
    


class UpdateNationalIDView(generics.UpdateAPIView):  # Use RetrieveUpdateAPIView for both retrieving and updating
    queryset = CustomUser.objects.all()
    serializer_class = NationalIDSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['put', 'options']


    def get_object(self):
        # Ensure we're updating the authenticated user's profile
        return self.request.user
    


# class FaceVerificationView(generics.GenericAPIView):
#     serializer_class = FaceVerificationSerializer
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
        
#         if serializer.is_valid():
#             nid_image = request.FILES['nid_image']
#             selfie_image = request.FILES['selfie_image']
    
#             # try:
#             # Save the NID image to a temporary file
#             with default_storage.open('temp_nid_image.jpg', 'wb+') as destination:
#                 for chunk in nid_image.chunks():
#                     destination.write(chunk)
#             temp_nid_image_path = default_storage.path('temp_nid_image.jpg')
            
#             # Perform perspective transformation on the NID image (assuming it's the front side)
#             transformed_nid_image = scan(temp_nid_image_path, side='front')
            
#             # Extract information from the transformed NID image
#             extracted_data = front_read(transformed_nid_image)
#             print(extracted_data)
            
#             nid_image_encodings = face_recognition.face_encodings(face_recognition.load_image_file(nid_image))
#             selfie_image_encodings = face_recognition.face_encodings(face_recognition.load_image_file(selfie_image))
            
#             if len(nid_image_encodings) == 0 or len(selfie_image_encodings) == 0:
#                 # No faces detected in one or both of the images
#                 return Response({"error": _("No face detected in one or both images.")}, status=status.HTTP_400_BAD_REQUEST)
            
#             # Compare the first face found in each image
#             nid_image_encoding = nid_image_encodings[0]
#             selfie_image_encoding = selfie_image_encodings[0]
#             results = face_recognition.compare_faces([nid_image_encoding], selfie_image_encoding, tolerance=0.6)
            
#             if results[0]:
                
#                 user = request.user
#                 user.is_verified = True  # Update is_verified to True
#                 user.save()  # Don't forget to save the user object
#                 return Response({"message": _("Faces match. Verification successful.")}, status=status.HTTP_200_OK)
#             else:
#                 return Response({"error": _("Faces do not match. Verification failed.")}, status=status.HTTP_400_BAD_REQUEST)
#             # except Exception as e:
#             #     # Handle unexpected errors during face encoding or comparison
#             #     return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
