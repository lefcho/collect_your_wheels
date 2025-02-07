from rest_framework.viewsets import ModelViewSet
from cyw_backend.series.models import Series
from cyw_backend.series.serializers import SeriesSerializer


class SeriesViewSet(ModelViewSet):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer
