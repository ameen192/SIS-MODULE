from django.conf.urls import url,include
from django.contrib import admin

from . import views

urlpatterns = [
	#url(r'^$', views.home),
	url(r'^$', views.login, name='login'),
	url(r'^home/', views.home, name='home'),
	url(r'^marks/', include('marks.urls')),
	url(r'^attendance/', include('attendance.urls')),
    url(r'^admin/', admin.site.urls), 
]
