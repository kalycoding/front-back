# Generated by Django 4.1.3 on 2022-11-14 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='rotated_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]