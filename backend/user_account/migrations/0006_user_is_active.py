# Generated by Django 4.2 on 2023-04-09 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_account', '0005_alter_user_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]