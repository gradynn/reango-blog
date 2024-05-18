from rest_framework import serializers
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content']

class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'comments']

    def get_comments(self, obj):
        return CommentSerializer(obj.comment_set.all(), many=True).data