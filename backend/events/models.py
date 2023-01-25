from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    time = models.CharField(max_length=255)