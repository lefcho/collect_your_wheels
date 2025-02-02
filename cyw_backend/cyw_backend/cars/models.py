from django.core.exceptions import ValidationError
from django.db import models


class Car(models.Model):
    toy_number = models.CharField(
        max_length=100,
        verbose_name='Toy number',
    )

    model = models.CharField(
        max_length=255,
        verbose_name='Model',
    )

    series = models.ForeignKey(
        to='series.Series',
        on_delete=models.CASCADE,
        verbose_name='Series',
        related_name='cars',
    )

    series_number = models.IntegerField(
        verbose_name='Number in series',
    )

    is_treasure_hunt = models.BooleanField(
        verbose_name='Is treasure hunt',
        default=False,
    )

    is_super_treasure_hunt = models.BooleanField(
        verbose_name='Is super treasure hunt',
        default=False,
    )

    image_url = models.URLField(
        verbose_name='Image URL',
        null=True,
        blank=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def clean(self):
        """
        Ensure that the series_number is not greater than the number_of_cars
        defined in the related Series.
        """
        super().clean()
        if self.series and self.series_number > self.series.number_of_cars:
            raise ValidationError({
                'series_number': (
                    f"Series number ({self.series_number}) cannot be greater than "
                    f"the total number of cars in the series ({self.series.number_of_cars})."
                )
            })

    def __str__(self):
        return self.model
