# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.views.generic.base import View

from backend.models import *

# Create your views here.

class HomePage(View):
	def get(self, request):
		college = College.objects.get(id=1)
		termList = ["Fall Term 2017", "Winter Term 2017", "Spring Term 2017", "Summer Term 2017",
			"Fall Term 2018", "Winter Term 2018", "Spring Term 2018", "Summer Term 2018",
			"Fall Term 2019", "Winter Term 2019", "Spring Term 2019", "Summer Term 2019",
			"Fall Term 2020", "Winter Term 2020", "Spring Term 2020", "Summer Term 2020"]
		context = {
			"college": college,
			"majorId": 1,
			"termList": termList
		}

		return render(request, "index.html", context)

class AllCollegesPage(View):
	def get(self, request):
		colleges = College.objects.all()
		conext = {"collegeList": colleges}
		return render(request, "colleges.html", conext)

class CollegePage(View):
	def get(self, request, collegeId):
		college = College.objects.get(id=collegeId)
		courses = college.courses.all()
		majors = college.majors.all()
		context = {
			"college": college,
			"courseList": courses,
			"majorList": majors
		}
		return render(request, "collegePage.html", context)

class end_result(View):
	def get(self, request):
		return render(request, "end_result.html")

class Graph(View):
	def get(self, request, collegeId, majorId):
		college = College.objects.get(id=collegeId)
		context = {
			"college": college,
			"majorId": majorId
		}
		return render(request, "graph.html", context)