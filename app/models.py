import uuid
from django.db import models


class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50) 
    birthdate = models.DateField(null=True, blank=True)
    
    def __str__(self):        
        return "{} {}".format(self.first_name, self.last_name)

    class Meta:
        abstract = True


class Patient(Person):
    allergies = models.CharField(max_length=255)


class Doctor(Person):
    role = models.CharField(max_length=50)


class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    text = models.TextField()
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)
    author = models.ForeignKey(Doctor, on_delete=models.PROTECT)

    def __str__(self):        
        return "{} ({})".format(self.title, self.author)