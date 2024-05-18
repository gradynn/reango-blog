import { useState } from 'react'

import './BlogPost.css'
import { createComment, deleteComment, deletePost, updateComment, updatePost } from '../../../services/backend.service'

const BlogPost = ({ id, title, content, comments }) => {
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [newComment, setNewComment] = useState('')

    const [editedComment, setEditedComment] = useState('')
    const [mutableComment, setMutableComment] = useState(null)

    const [editedTitle, setEditedTitle] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const [editingPost, setEditingPost] = useState(false)

    const handleSubmit = async () => {
        await createComment(id, newComment);
        setNewComment('');
        window.location.reload();
    }

    const handleDeleteComment = (commentId) => async () => {
        await deleteComment(commentId);
        window.location.reload();
    }

    const handleEditComment = (commentId, content) => async () => {
        if (mutableComment === commentId) {
            await updateComment(commentId, editedComment);
            setMutableComment(null);
            setEditedComment('');
            window.location.reload();
        } else {
            setMutableComment(commentId);
            setEditedComment(content);
        }
    }

    const handleDeletePost = async () => {
        await deletePost(id);
        window.location.reload();
    }

    const handleEditPost = async () => {
        if (editingPost) {
            await updatePost(id, editedTitle, editedDescription);
            setEditedTitle('');
            setEditedDescription('');
            setEditingPost(false);
            window.location.reload();
        } else {
            setEditingPost(true);
            setEditedTitle(title);
            setEditedDescription(content);
        }
    }
    
    return (<div className="blog-post-wrapper">
        {
            editingPost ? 
            <div className='edit-post-forms'>
                <label>
                    Title:
                    <input type="text" value={editedTitle} onChange={(event) => setEditedTitle(event.target.value)}/>
                </label>
                <label>
                    Content:
                    <textarea value={editedDescription} onChange={(event) => setEditedDescription(event.target.value)}/>
                </label>
            </div>
            : <div>
                <h2>{title}</h2>
                <p>{content}</p>
            </div>
        }
        <h3>Comments:</h3>
        <ul>
            {comments.map((comment) => (
                <li key={comment.id}>
                    {
                        mutableComment === comment.id ? 
                        <input type="text" value={editedComment}  onChange={(event) => setEditedComment(event.target.value)}/>
                        : comment.content
                    }
                    <button onClick={handleEditComment(comment.id, comment.content)}>{mutableComment == comment.id ? 'Submit' : 'Edit'}</button>
                    <button onClick={handleDeleteComment(comment.id)}>Delete</button>
                </li>
            ))}
        </ul>
        <button onClick={() => setShowCommentForm(!showCommentForm)}>{showCommentForm ? 'Hide' : 'New Comment'}</button>
        {showCommentForm && <form onSubmit={handleSubmit}>
            <label>
                Comment:
                <input type="text" value={newComment} onChange={(event) => setNewComment(event.target.value)}/>
            </label>
            <button type="submit">Post</button>
        </form>}
        <button onClick={handleDeletePost}>Delete Post</button>
        <button onClick={handleEditPost}>{editingPost ? 'Submit' : 'Edit Post'}</button>
    </div>)
}

export default BlogPost