import { useState } from 'react';

import { createBlogPost } from '../../services/backend.service';
import './NewBlogPostForm.css';

const NewBlogPostForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        createBlogPost(title, content);
        setTitle('');
        setContent('');
        setShowForm(false);
        window.location.reload();
    }
    
    return (<div>
            <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide' : 'New Post'}</button>
            {showForm && <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                </label>
                <label>
                    Content:
                    <textarea value={content} onChange={(event) => setContent(event.target.value)} />
                </label>
                <button type="submit">Post</button>
            </form>}
    </div>);
}

export default NewBlogPostForm;