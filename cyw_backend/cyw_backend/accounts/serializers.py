from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', ]
        write_only_fields = ['email', 'password', ]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
