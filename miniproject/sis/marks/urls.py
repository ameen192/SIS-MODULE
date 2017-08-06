from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^selectstuds/',views.selectstuds, name='selectstuds'),
    url(r'^wholegraph/',views.wholegraph, name='wholegraph'),
    url(r'^stats/',views.stats, name='stats'),
    url(r'^viewtoppers/',views.viewtoppers, name='viewtoppers'),
    url(r'^getMultiGraph/',views.getMultiGraph, name='getMultiGraph'),
    url(r'^getDataSet/',views.getDataSet, name='getDataSet')
]
