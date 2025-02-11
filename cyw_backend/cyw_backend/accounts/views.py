from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import AllowAny

from cyw_backend.accounts.serializers import UserSerializer

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]





























