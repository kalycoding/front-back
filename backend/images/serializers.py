from rest_framework import serializers

from .models import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class AngleSerializer(serializers.Serializer):
    angle = serializers.CharField(max_length=200)




