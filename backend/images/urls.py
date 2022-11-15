from django.urls import path
from .views import ImageListCreateView, ImageConvert

urlpatterns = [
   path('', ImageListCreateView.as_view()),
   path('<int:pk>/', ImageConvert.as_view())
]
