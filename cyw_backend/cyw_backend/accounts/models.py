from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(
        unique=True,)

    collected_cars = models.ManyToManyField(
        to='cars.Car',
        related_name='collectors',
        blank=True,
        verbose_name='Collected Cars'
    )

    wishlisted_cars = models.ManyToManyField(
        to='cars.Car',
        related_name='wishlisters',
        blank=True,
        verbose_name='Wishlisted Cars'
    )

    def __str__(self):
        return self.username
