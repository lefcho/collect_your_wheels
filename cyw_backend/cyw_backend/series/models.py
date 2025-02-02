from django.db import models


class Series(models.Model):
    title = models.CharField(
        max_length=150,
        verbose_name='Series Title',
    )

    description = models.TextField(
        verbose_name='Description',
    )

    year = models.IntegerField(
        verbose_name='Year',
    )

    def __str__(self):
        return self.title
