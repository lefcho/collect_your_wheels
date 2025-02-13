from django.urls import path

from cyw_backend.series import views

urlpatterns = [
    path('search-series/', views.SearchSeriesListView.as_view(), name='search-series'),

]