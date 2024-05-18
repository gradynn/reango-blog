import { useEffect, useState } from 'react'

import { getBlogPosts } from '../../services/backend.service'
import BlogPost from './BlogPost/BlogPost'

const BlogPostsDisplay = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    const fetchBlogPosts = async () => {
        const blogPosts = await getBlogPosts();
        console.log(blogPosts);
        setBlogPosts(blogPosts);
    }

    useEffect(() => {
        fetchBlogPosts();
    }, [])
    
    return (<div>
        {blogPosts.map((blogPost, index) => (
            <BlogPost key={index} id={blogPost.id} title={blogPost.title} content={blogPost.content} comments={blogPost.comments}/>
        ))}
    </div>) 
}

export default BlogPostsDisplay