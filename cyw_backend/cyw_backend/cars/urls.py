from django.urls import path

from cyw_backend.cars import views

urlpatterns = [
    path('collected-cars/', views.UserCollectedCarsListView.as_view(), name='collected-cars'),
    path('collected-cars/<int:car_id>/', views.UserCollectedCarCreateDeleteView.as_view(), name='mark-collected'),

]