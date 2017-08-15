# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-14 16:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_course'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='depth',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='course',
            name='majors',
            field=models.ManyToManyField(related_name='courses', to='backend.Major'),
        ),
    ]