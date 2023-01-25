from django.urls import path
from . import views

urlpatterns=[
    path('', views.music_list),
    path('<int:pk>/', views.music_detail),
]
