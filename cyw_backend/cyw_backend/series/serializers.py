
from cyw_backend.series.models import Series
from cyw_backend.utils import ReadOnlyModelSerializer


class SeriesSerializer(ReadOnlyModelSerializer):
    class Meta:
        model = Series
        fields = '__all__'
