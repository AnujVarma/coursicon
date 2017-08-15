# -*- coding: utf-8 -*-
from __future__ import unicode_literals

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

class Course(models.Model):
	name = models.CharField(max_length=500)
	depth = models.IntegerField(default=0)
	college = models.ForeignKey(College, related_name="courses")
	majors = models.ManyToManyField(Major, related_name="courses")
	children = models.ManyToManyField("Course", related_name="parents")
	courseNumber = models.CharField(max_length=128)

	def __str__(self):
		return self.college.name + ": " + self.name + ": " + str(self.depth)