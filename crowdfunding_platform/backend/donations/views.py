from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Donation
from .serializers import DonationSerializer

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Update campaign's current amount
        donation = serializer.instance
        campaign = donation.campaign
        campaign.current_amount += donation.amount
        campaign.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)