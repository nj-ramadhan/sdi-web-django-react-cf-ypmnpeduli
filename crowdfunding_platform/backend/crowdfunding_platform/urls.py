from django.contrib import admin
from django.urls import path, include
from ckeditor_uploader import views as ckeditor_views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from campaigns.views import CampaignViewSet
from donations.views import DonationViewSet

router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet, basename='campaign')
router.register(r'donations', DonationViewSet, basename='donation')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/donations/', include('donations.urls')),
    
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('ckeditor/upload/', ckeditor_views.upload, name='ckeditor_upload'),
    # path('api/auth/', include('accounts.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)