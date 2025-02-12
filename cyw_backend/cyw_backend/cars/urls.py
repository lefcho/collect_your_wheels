from django.urls import path, include

from cyw_backend.cars import views

urlpatterns = [
    path('collected-cars/', views.CollectedCarsListView.as_view(), name='collected-cars'),
    path('collected-cars/<int:car_id>/', views.CollectedCarCreateDestroyView.as_view(), name='mark-collected'),

    path('wishlisted-cars/', views.WishlistedCarsListView.as_view(), name='wishlisted-cars'),
    path('wishlisted-cars/<int:car_id>/', views.WishlistedCarsCreateDestroyView.as_view(), name='mark-wishlisted'),
]