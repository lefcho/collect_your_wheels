from rest_framework.viewsets import ModelViewSet
from cyw_backend.cars.models import Car
from cyw_backend.cars.serializers import CarSerializer


class CarViewSet(ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
