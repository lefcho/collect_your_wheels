from rest_framework import generics, filters
from rest_framework.permissions import AllowAny

from cyw_backend.series.models import Series
from cyw_backend.series.serializers import SeriesSerializer


class SearchSeriesListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = SeriesSerializer
    queryset = Series.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'year',]
