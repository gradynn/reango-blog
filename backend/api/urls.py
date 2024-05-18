from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('posts', views.get_posts, name="list-posts"),
    path('posts/create', views.new_post, name="create-new-post"),
    path('posts/comment/<int:post_id>', views.new_comment, name="create-new-comment"),
    path('posts/update/<int:post_id>', views.update_post, name="update-existing-post"),
    path('posts/update-comment/<int:comment_id>', views.update_comment, name="update-existing-comment"),
    path('posts/delete/<int:post_id>', views.delete_post),
    path('posts/delete-comment/<int:comment_id>', views.delete_comment)
]
