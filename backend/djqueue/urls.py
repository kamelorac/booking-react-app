from django.urls import path
from . import views

urlpatterns=[
    path('', views.djqueue_list),
    path('<int:pk>/', views.djqueue_detail),
]