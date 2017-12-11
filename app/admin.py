from django.contrib import admin
from .models import Patient, Doctor, Document
# Register your models here.
admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Document)