# campaigns/admin.py
from django.contrib import admin
from .models import Campaign, Update

admin.site.register(Campaign)
admin.site.register(Update)