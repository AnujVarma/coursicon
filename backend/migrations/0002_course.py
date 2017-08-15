# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-14 12:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('courseNumber', models.CharField(max_length=128)),
                ('children', models.ManyToManyField(related_name='parents', to='backend.Course')),
                ('college', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='backend.College')),
                ('majors', models.ManyToManyField(related_name='coureses', to='backend.Major')),
            ],
        ),
    ]