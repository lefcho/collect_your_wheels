from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.text import slugify


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

    slug = models.SlugField(
        unique=True,
        verbose_name='Slug',
    )

    image_url = models.URLField(
        verbose_name='Image URL',
        null=True,
        blank=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
