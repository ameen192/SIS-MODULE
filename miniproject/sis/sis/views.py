from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
'''
def login(request):
	return render()
'''
@csrf_exempt
def login(request):
    return render(request, 'sis/login.html')

@csrf_exempt
def home(request):
    return render(request, 'sis/home.html')
