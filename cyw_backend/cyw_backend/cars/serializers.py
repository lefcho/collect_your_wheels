from rest_framework import serializers

from cyw_backend.cars.models import Car


class CarSerializer(serializers.Serializer):
    class Meta:
        model = Car
        fields = '__all__'
