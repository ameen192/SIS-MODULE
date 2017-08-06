from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import ssl,json,mpld3
import matplotlib.pyplot as plt
import numpy as np

ssl._create_default_https_context = ssl._create_unverified_context
import pandas as pd

dfile = ""
odf = pd.DataFrame()


def index(request):
    return render(request, 'marks/index.html')


@csrf_exempt
def getDataSet(request):
	year = int(request.GET.get('year'))
	sem = int(request.GET.get('sem'))
	global dfile
	if year == 2015 and sem == 3:
		dfile = "marks-2015-3rd.csv"
	elif year == 2015 and sem == 4:
		dfile = "marks-2015-4th.csv"
	else:
		return HttpResponse('null')
	global odf
	odf = pd.read_csv(dfile)
	df = odf['subjects'].unique().tolist()
	js1 = json.dumps(df)
	return HttpResponse(js1)

@csrf_exempt
def selectstuds(request):
	global odf
	df = odf[['names','usn']]
	usn = df['usn'].unique().tolist()
	names = df['names'].unique().tolist()
	lst = list(zip(usn,names))
	js1 = json.dumps(lst)
	return HttpResponse(js1)

@csrf_exempt
def stats(request):
	term = request.GET.get('term')
	global odf
	dct = {}
	df = odf[term].describe().to_dict()
	dct['totalstud'] = df.get('count')
	dct['mean'] = df.get('mean')
	dct['deviation'] = df.get('std')
	dct['max'] = df.get('max')
	dct['min'] = df.get('min')
	js1 = json.dumps(dct)
	return HttpResponse(js1)

@csrf_exempt
def wholegraph(request):
	term = request.POST.get('term')
	print("term is : ",term)
	global odf
	subjectlist = odf['subjects'].unique().tolist()
	marklst = []
	for i in subjectlist:
		temp = odf[odf.subjects == i]
		marklst += [temp[term].tolist()]
	fig = plt.figure()
	if term == 'internal1' or 'internal2' or 'internal3':
		bins = [0,5,10,15,20,25,30]
	elif term == 'component':
		bins = [0,5,10,15,20]
	elif term == 'total' or 'external':
		bins = [0,5,10,15,20,25,30,35,40,45,50]
	elif term == 'final':
		bins = [0,10,20,30,40,50,60,70,80,90,100]
	colors = ['b','g','r','c','m','y']
	plt.xlabel("x-axis")
	plt.ylabel("y-axis")
	plt.title("my graph")
	plt.hist(marklst, bins, color=colors, label=subjectlist)
	plt.legend()
	html = mpld3.fig_to_html(fig)
	return HttpResponse(html)

@csrf_exempt
def viewtoppers(request):
	term = request.GET.get('term')
	subject = request.GET.get('subject')
	print("values of term and subject",term,subject)
	global odf
	df = odf[['usn',term,'subjects','names']]
	print("type first df : ",type(df))
	if subject == 'all':
		df = df.groupby(['usn','names'], as_index=False)[term].agg('sum')
	else:
		df = df[df.subjects == subject]
	print("type of df is : ",type(df))
	df2 = df.sort_values(by=term, ascending=False)
	df2 = df2.head(10)
	mlst = df2[term].tolist()
	slst = df2['names'].tolist()
	lst = list(zip(mlst,slst))
	print(type(lst))
	js1 = json.dumps(lst)
	return HttpResponse(js1)

@csrf_exempt
def getMultiGraph(request):
	term = request.GET.get('term')
	subject = request.GET.get('subject')
	studs = request.GET.getlist('selected[]')
	nameusn = []
	for s in studs:
		nameusn.append(s.split(','))
	fig1 = plt.figure()
	for usn in nameusn:
		df = odf[odf.usn == usn[0]]
		subslst = df['subjects'].tolist()
		marklst = df[term].tolist()
		x = np.array([1,2,3,4,5,6])
		my_xticks = subslst
		plt.xticks(x, my_xticks)
		plt.plot(x,marklst,label=usn[1])
	plt.xlabel("subjects")
	plt.ylabel("marks")
	plt.title("my graph")
	plt.legend()
	html = mpld3.fig_to_html(fig1)
	return HttpResponse(html)





        
    
























