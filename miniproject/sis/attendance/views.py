from django.shortcuts import render

# Create your views here.

def attenIndex(request):
	return render(request, 'attendance/home.html')