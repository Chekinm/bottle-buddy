# Generated by Django 4.2.2 on 2023-07-08 14:08

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bottles', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='collector',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='collector',
            name='longitude',
        ),
        migrations.RemoveField(
            model_name='order',
            name='address',
        ),
        migrations.RemoveField(
            model_name='order',
            name='is_assigned',
        ),
        migrations.RemoveField(
            model_name='order',
            name='is_done',
        ),
        migrations.RemoveField(
            model_name='order',
            name='is_taken',
        ),
        migrations.RemoveField(
            model_name='recyclepoint',
            name='address',
        ),
        migrations.AddField(
            model_name='order',
            name='apparment_number',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='order',
            name='comments',
            field=models.CharField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='order',
            name='entrance_number',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='order',
            name='floor',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='order',
            name='house_number',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='order',
            name='latitude',
            field=models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(-90.0), django.core.validators.MaxValueValidator(90.0)]),
        ),
        migrations.AddField(
            model_name='order',
            name='longitude',
            field=models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(180.0)]),
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.IntegerField(choices=[(1, 'Is Open'), (2, 'Is Assigned'), (3, 'Is Taken'), (4, 'Is Done')], default=1),
        ),
        migrations.AddField(
            model_name='recyclepoint',
            name='apparment_number',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='recyclepoint',
            name='comments',
            field=models.CharField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='recyclepoint',
            name='entrance_number',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='recyclepoint',
            name='floor',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='recyclepoint',
            name='house_number',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='recyclepoint',
            name='latitude',
            field=models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(-90.0), django.core.validators.MaxValueValidator(90.0)]),
        ),
        migrations.AddField(
            model_name='recyclepoint',
            name='longitude',
            field=models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(180.0)]),
        ),
        migrations.DeleteModel(
            name='Address',
        ),
    ]
