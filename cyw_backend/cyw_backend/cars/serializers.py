from rest_framework import serializers

from cyw_backend.cars.models import Car
from cyw_backend.series.serializers import SeriesSerializer
from cyw_backend.utils import ReadOnlyModelSerializer


class CarSerializer(ReadOnlyModelSerializer):
    is_collected = serializers.SerializerMethodField()
    is_wishlisted = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = '__all__'

    def get_is_collected(self, obj):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            return request.user.collected_cars.filter(pk=obj.pk).exists()
        return False

    def get_is_wishlisted(self, obj):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            return request.user.wishlisted_cars.filter(pk=obj.pk).exists()
        return False


class CarWithSeriesSerializer(CarSerializer):
    series = SeriesSerializer(read_only=True)
