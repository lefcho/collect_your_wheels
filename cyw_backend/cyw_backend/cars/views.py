from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cyw_backend.cars.models import Car
from cyw_backend.cars.serializers import CarSerializer


class UserCollectedCarsListView(generics.ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        collected_cars = user.collected_cars.all()
        return collected_cars


class UserCollectedCarCreateDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, car_id, *args, **kwargs):
        """Mark a car as collected."""
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
        """Remove a car from the collected list."""
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


