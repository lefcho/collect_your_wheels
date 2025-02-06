from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Series(models.Model):
    title = models.CharField(
        max_length=150,
        verbose_name='Series Title',
    )

    description = models.TextField(
        null=True,
        blank=True,
        verbose_name='Description',
    )

    year = models.IntegerField(
        verbose_name='Year',
        validators=[MinValueValidator(1968), MaxValueValidator(2100)],
    )

    number_of_cars = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='Number of cars',
    )

    image_url = models.URLField(
        verbose_name='Image URL',
        null=True,
        blank=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.title
