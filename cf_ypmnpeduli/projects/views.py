from rest_framework import viewsets
from .models import Program, Donation
from .serializers import ProgramSerializer, DonationSerializer

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer


class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def perform_create(self, serializer):
        program = serializer.validated_data['program']
        amount = serializer.validated_data['amount']
        
        # Update program's current amount
        program.current_amount += amount
        program.save()
        
        serializer.save()    