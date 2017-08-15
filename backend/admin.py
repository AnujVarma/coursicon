# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from backend.models import *

# Register your models here.

admin.site.register(College)
admin.site.register(Major)
admin.site.register(Course)