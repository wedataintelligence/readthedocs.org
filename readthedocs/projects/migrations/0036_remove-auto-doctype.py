# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-12-17 16:33
from __future__ import unicode_literals

from django.db import migrations


def migrate_auto_doctype(apps, schema_editor):
    Project = apps.get_model('projects', 'Project')
    Project.objects.filter(documentation_type='auto').update(
        documentation_type='sphinx',
    )


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0035_container_time_limit_as_integer'),
    ]

    operations = [
        migrations.RunPython(migrate_auto_doctype),
    ]
