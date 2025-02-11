from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from cyw_backend.cars.serializers import CarSerializer


class UserCollectedCarsListView(generics.ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        collected_cars = user.collected_cars.all()
        return collected_cars
