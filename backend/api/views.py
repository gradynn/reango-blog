from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer

# Create your views here
@api_view(['GET'])
def index(request):
    return Response({"message": "Server is up and running..."})

# Get all posts (with comments)
@api_view(['GET'])
def get_posts(request):
    all_posts = Post.objects.all()
    serializer = PostSerializer(all_posts, many=True)
    return Response(serializer.data)
        

# Create a post
@api_view(['POST'])
def new_post(request):
    payload = request.data
    try:
        post = Post(title=payload["title"], content=payload["content"])
        post.save()
        return Response(PostSerializer(post).data)
    except:
        return Response({"error": "something went wrong creating blog post"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Create a comment
@api_view(['POST'])
def new_comment(request, post_id):
    payload = request.data
    try:
        post = Post.objects.get(pk=post_id)
        comment = Comment(content=payload["content"], post=post)
        comment.save()
        return Response(CommentSerializer(comment).data)
    except:
        return Response({"error": "something went wrong creating comment"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

# Edit a post
@api_view(['PATCH'])
def update_post(request, post_id):
    payload = request.data
    try:
        post = Post.objects.get(pk=post_id)
        if "title" in payload.keys():
            post.title = payload["title"]
        if "content" in payload.keys():
            post.content = payload["content"]
        post.save()
        return Response(PostSerializer(post).data)
    except:
        return Response({"error": "something went wrong updating blog post"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  


# Edit a comment
@api_view(['PATCH'])
def update_comment(request, comment_id):
    payload = request.data
    try:
        comment = Comment.objects.get(pk=comment_id)
        if "content" in payload.keys():
            comment.content = payload["content"]
        comment.save()
        return Response(CommentSerializer(comment).data)
    except:
        return Response({"error": "something went wrong updating comment"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   

# Delete a post
@api_view(['DELETE'])
def delete_post(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
        post.delete()
        return Response({ "message": "post deleted successfully" })
    except:
        return Response({"error": "something went worng deleting blog post"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Delete a comment
@api_view(['DELETE'])
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(pk=comment_id)
        comment.delete()
        return Response({ "message": "comment deleted successfully" })
    except:
      return Response({"error": "something went worng deleting comment"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 