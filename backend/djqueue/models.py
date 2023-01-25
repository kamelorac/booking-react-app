from django.db import models

# Create your models here.

class Queue(models.Model):
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=50)
    genre = models.CharField(max_length=50)

