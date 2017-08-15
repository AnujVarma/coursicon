# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.views.generic.base import View

from backend.models import *

# Create your views here.

class HomePage(View):
	def get(self, request):
		return render(request, "index.html")

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