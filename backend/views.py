# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets

from backend.models import *
from backend.serializers import UserMetadataSerializer, MajorCourseMapSerializer

# Create your views here.

class UserMetadataViewSet(viewsets.ModelViewSet):
    queryset = CoursiconUser.objects.all()
    serializer_class = UserMetadataSerializer

class MajorCourseMapViewSet(viewsets.ModelViewSet):
    queryset = Major.objects.all()
    serializer_class = MajorCourseMapSerializer
