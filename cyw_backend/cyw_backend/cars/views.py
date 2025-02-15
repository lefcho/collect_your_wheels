from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from cyw_backend.cars.models import Car
from cyw_backend.cars.serializers import CarSerializer


class CollectedCarsListView(generics.ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter,
    ]
    search_fields = ['toy_number', 'model', 'series__title',]

    def get_queryset(self):
        user = self.request.user
        collected_cars = user.collected_cars.all()
        return collected_cars


class CollectedCarCreateDestroyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, car_id, *args, **kwargs):
        try:
            car = Car.objects.get(pk=car_id)
        except Car.DoesNotExist:
            return Response(
                {"error": "Car not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        request.user.collected_cars.add(car)
        return Response(
            {"status": "Car marked as collected."},
            status=status.HTTP_200_OK,
        )

    def delete(self, request, car_id, *args, **kwargs):
        try:
            car = Car.objects.get(pk=car_id)
        except Car.DoesNotExist:
            return Response(
                {"error": "Car not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        request.user.collected_cars.remove(car)
        return Response(
            {"status": "Car removed from collection."},
            status=status.HTTP_200_OK,
        )


class WishlistedCarsListView(generics.ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter,
    ]
    search_fields = ['toy_number', 'model', 'series__title',]
    
    def get_queryset(self):
        user = self.request.user
        wishlisted_cars = user.wishlisted_cars.all()
        return wishlisted_cars


class WishlistedCarsCreateDestroyView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, car_id, *args, **kwargs):
        try:
            car = Car.objects.get(pk=car_id)
        except Car.DoesNotExist:
            return Response(
                {"error": "Car not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        request.user.wishlisted_cars.add(car)
        return Response(
            {"status": "Car wishlisted."},
            status=status.HTTP_200_OK,
        )
            
    def delete(self, request, car_id, *args, **kwargs):
        try:
            car = Car.objects.get(pk=car_id)
        except Car.DoesNotExist:
            return Response(
                {"error": "Car not found not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        request.user.wishlisted_cars.remove(car)
        return Response(
            {"status": "Car no longer wishlisted."},
            status=status.HTTP_200_OK,
        )


class SearchCarsListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    filter_backends = [
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    search_fields = ['toy_number', 'model', 'series__title',]
    filterset_fields = ['series__title',]
























