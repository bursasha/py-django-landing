from django.db import models

# Create your models here.

class User (models.Model):
    name = models.CharField(max_length=200, verbose_name='Name')
    surname = models.CharField(max_length=200, verbose_name='Surname')
    email = models.EmailField(verbose_name='Email')
    phone = models.CharField(max_length=100, blank=True, verbose_name='Phone')
    message = models.TextField(verbose_name='Message')
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} {self.date}'

    class Meta:
        verbose_name = 'Request'
        verbose_name_plural = 'Requests'
