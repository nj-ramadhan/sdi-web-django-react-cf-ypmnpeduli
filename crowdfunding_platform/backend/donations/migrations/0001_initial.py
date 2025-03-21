# Generated by Django 4.2.19 on 2025-02-18 17:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('campaigns', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('donor_name', models.CharField(max_length=100)),
                ('donor_phone', models.CharField(max_length=15)),
                ('donor_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('is_anonymous', models.BooleanField(default=False)),
                ('message', models.TextField(blank=True)),
                ('payment_method', models.CharField(choices=[('bsi', 'Bank Syariah Indonesia'), ('bjb', 'Bank Jabar Banten Syariah')], max_length=10)),
                ('payment_status', models.CharField(default='pending', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaigns.campaign')),
                ('donor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
