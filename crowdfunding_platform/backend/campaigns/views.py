# campaigns/views.py
from rest_framework import viewsets
from django.db.models import Q
from .models import Campaign
from .serializers import CampaignSerializer

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.filter(is_active=True)  # Add this line
    serializer_class = CampaignSerializer
    
    def get_queryset(self):
        queryset = Campaign.objects.filter(is_active=True)
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )
        return queryset