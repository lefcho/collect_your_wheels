from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework.permissions import AllowAny

from cyw_backend.series.models import Series
from cyw_backend.series.serializers import SeriesSerializer


class SearchSeriesListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = SeriesSerializer
    queryset = Series.objects.all()
    filter_backends = [
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    search_fields = ['title', 'year',]
    filterset_fields = ['year',]


class SeriesDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = SeriesSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Series.objects.all()
