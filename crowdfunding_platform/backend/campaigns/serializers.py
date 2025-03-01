# campaigns/serializers.py
from rest_framework import serializers
from .models import Campaign, Update
from donations.models import Donation

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ['id', 'donor_name', 'amount', 'created_at']

class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Update
        fields = ['id', 'title', 'description', 'created_at']   

class CampaignSerializer(serializers.ModelSerializer):
    donations = DonationSerializer(many=True, read_only=True)
    updates = UpdateSerializer(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = [
            'id', 'title', 'description', 'category', 'thumbnail', 'target_amount', 'current_amount',
            'is_active', 'created_at', 'donations', 'updates'
        ]