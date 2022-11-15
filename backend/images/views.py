from django.shortcuts import render
from rest_framework import generics, views, response
from .models import Image
from .serializers import ImageSerializer, AngleSerializer
# Create your views here.

from PIL import Image as im

class ImageListCreateView(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

class ImageConvert(views.APIView):
    serializer_class = AngleSerializer
    def post(self, request, pk):
        serializer = request.data
        angle = serializer['angle']
        image = Image.objects.get(pk=pk)
        print(image.image)
        name = image.image.name
        print(name)
        r = rotate_image(f'{name}', angle)
        i = Image.objects.get(pk=pk)
        # print(i)
        i.image = r
        i.save()
        return response.Response(data={'rotated_image': 's'})
    
def rotate_image(image, angle):
    Original_Image = im.open(f'media/{image}')
    rotated_image = Original_Image.rotate(angle)
    rotated_image.save(f'media/{image}')
    return f'{image}'