from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import QueueSerializer
from .models import Queue
from rest_framework import status

# Create your views here.
@api_view(['GET', 'POST'])
def djqueue_list(request):

    if request.method =='GET':
        djqueue = Queue.objects.all()
        serializer = QueueSerializer(djqueue, many=True)
        return Response (serializer.data)

    elif request.method == 'POST':
        serializer = QueueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def djqueue_detail(request, pk):
    print(request.data)
    queue = get_object_or_404(Queue, pk=pk)
    if request.method == 'GET':
        serializer = QueueSerializer(Queue)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = QueueSerializer(queue, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
    elif request.method == 'DELETE':
        queue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        