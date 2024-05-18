from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    post = models.CharField(max_length=1000)
    authored = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=250)
