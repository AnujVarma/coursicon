# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-17 02:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20170817_0242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='reqCourses',
            field=models.ManyToManyField(blank=True, related_name='andChildren', to='backend.Course'),
        ),
    ]