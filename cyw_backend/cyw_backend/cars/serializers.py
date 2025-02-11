
from cyw_backend.cars.models import Car
from cyw_backend.series.serializers import SeriesSerializer
from cyw_backend.utils import ReadOnlyModelSerializer


class CarSerializer(ReadOnlyModelSerializer):
    series = SeriesSerializer(read_only=True)

    class Meta:
        model = Car
        fields = '__all__'
