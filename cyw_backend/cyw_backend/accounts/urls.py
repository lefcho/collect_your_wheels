from django.urls import path

from cyw_backend.accounts import views

urlpatterns = [
    path('user/register/', views.CreateUserView.as_view(), name='register'),
]