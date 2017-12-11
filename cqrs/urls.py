from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('index/', TemplateView.as_view(template_name='app/index.html')),
    path('admin/', admin.site.urls),
]
