from django.urls import path
from .views import *
from rest_framework.authtoken.views import ObtainAuthToken


urlpatterns = [
    path('', ApiHomeView.as_view(), name='root-api-view'),
    path('auth/login/', ObtainAuthToken.as_view(), name='token_obtain_pair'),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('profile/', ProfileView.as_view(), name='auth_profile'),
    path('profile/update/', UpdateProfileView.as_view(), name='update_profile'),
    path('change-password/', PasswordChangeView.as_view(), name='change-password'),
    path('deactivate-account/', UserDeactivateView.as_view(), name='deactivate-account'),
    path('request-reset-password/', RequestPasswordResetEmailView.as_view(), name='request-reset-email'),
    path('password-reset/<uidb64>/<token>/', PasswordResetView.as_view(), name='password-reset-confirm'),

]

