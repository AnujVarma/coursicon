# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.views.generic.base import View

from backend.models import *

# Create your views here.

class RegistrationView(View):
	def get(self, request):
		return render(request, "registration/registration.html", {"error": request.GET.get("error")})

	def post(self, request):
		formData = request.POST
		username = formData.get("username")
		firstName = formData.get("firstname")
		lastName = formData.get("lastname")
		email = formData.get("email")
		password1 = formData.get("password1")
		password2 = formData.get("password2")

		# handle case where passwords don't match
		if password1 != password2:
			return redirect("/register/?error=passwordMismatch")

		# handle case when username already exists
		if CoursiconUser.objects.filter(username=username).exists():
			return redirect("/register/?error=usernameExists")

		# create the user
		user = CoursiconUser(
			username=username,
			email=email,
			last_name=lastName,
			first_name=firstName)
		user.save()
		# setting the password because django expects a password hash
		user.set_password(password1)
		user.save()

		# login the user and send to homepage
		user = authenticate(username=username, password=password1)
		login(request, user)
		return redirect('/accounts/login')


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
