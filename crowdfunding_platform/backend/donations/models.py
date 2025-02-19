from django.db import models
from accounts.models import User
from campaigns.models import Campaign

class Donation(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('bsi', 'Bank Syariah Indonesia'),
        ('bjb', 'Bank Jabar Banten Syariah'),
    ]
    
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    donor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    donor_name = models.CharField(max_length=100)
    donor_phone = models.CharField(max_length=15)
    donor_email = models.EmailField(blank=True, null=True)
    is_anonymous = models.BooleanField(default=False)
    message = models.TextField(blank=True)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHOD_CHOICES)
    payment_status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)