from rest_framework import serializers

from cyw_backend.series.models import Series


class SeriesSerializer(serializers.Serializer):
    class Meta:
        model = Series
        fields = '__all__'
