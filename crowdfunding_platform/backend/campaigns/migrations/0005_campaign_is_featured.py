# Generated by Django 4.2.19 on 2025-03-01 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0004_remove_campaign_collected_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='is_featured',
            field=models.BooleanField(default=False),
        ),
    ]
