# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class College(models.Model):
	name = models.CharField(max_length=128)

	def __str__(self):
		return self.name

class Major(models.Model):
	name = models.CharField(max_length=128)
	college = models.ForeignKey(College, related_name="majors")

	def __str__(self):
		return self.college.name + ": " + self.name

class OrReq(models.Model):
	reqCourses = models.ManyToManyField("Course", related_name="orChildren")
	course = models.ForeignKey("Course", related_name="orReqs")

class AndReq(models.Model):
	reqCourses = models.ManyToManyField("Course", related_name="andChildren")
	course = models.ForeignKey("Course", related_name="andReqs")

class Course(models.Model):
	name = models.CharField(max_length=500)
	depth = models.IntegerField(default=0)
	college = models.ForeignKey(College, related_name="courses")
	majors = models.ManyToManyField(Major, related_name="courses")
	courseNumber = models.CharField(max_length=128)
	description = models.TextField(default="")

	def __str__(self):
		return self.college.name + ": " + self.name + ": " + str(self.depth)

class CoursiconUser(AbstractUser):
	college = models.ForeignKey(College, related_name="students", blank=True, null=True)

class TakenCourse(models.Model):
	course = models.ForeignKey(Course, related_name="studentsTaken")
	user = models.ForeignKey(CoursiconUser, related_name="takenCourses")
	term = models.CharField(max_length=100, default="")
	review = models.TextField(default="")
	rating = models.IntegerField(default=0)
