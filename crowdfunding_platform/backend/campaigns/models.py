from django.db import models

class Campaign(models.Model):
    CATEGORY_CHOICES = [
        ('dhuafa', 'Peduli Dhuafa'),
        ('yatim', 'Peduli Anak Yatim'),
        ('quran', 'Wakaf Mushaf Al Quran'),
        ('qurban', 'Qurban Peduli'),
        ('palestine', 'Bantuan Palestina'),
        ('education', 'Bantuan Pendidikan'),
        ('iftar', 'Berbagi Iftar'),
        ('jumat', 'Jumat Berkah'),
    ]
    
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    thumbnail = models.ImageField(upload_to='campaign_images/')
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)