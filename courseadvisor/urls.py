from django.conf.urls import url
from django.contrib import admin

from courseadvisor.views import *

urlpatterns = [
    url(r'^$', HomePage.as_view()),
    url(r'^colleges$', AllCollegesPage.as_view()),
    url(r'^colleges/(?P<collegeId>[0-9]+)$', CollegePage.as_view()),
    url(r'^colleges/end_result$', end_result.as_view()),
    url(r'^colleges/(?P<collegeId>[0-9]+)/(?P<majorId>[0-9]+)$', Graph.as_view()),
]