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
    )

    number_of_cars = models.IntegerField(
        verbose_name='Number of cars',
    )

    imageURL = models.URLField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.title
