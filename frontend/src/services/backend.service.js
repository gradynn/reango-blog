const BASE_URL = 'http://127.0.0.1:8000/api/posts'

export const getBlogPosts = async () => {
    try {
        const response = await fetch(
            BASE_URL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log(response)
        return response.json()
    } catch (error) {
        console.error('Error fetching blog posts', error)
    }
}

export const createBlogPost = async (title, content) => {
    try {
        const response = await fetch(
            BASE_URL + '/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content
                })
            }
        )
        return response.json()
    } catch (error) {
        console.error('Error creating blog post', error)
    }
}

export const createComment = async (postId, content) => {
    try {
        const response = await fetch(
            BASE_URL + `/comment/${postId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content
                })
            }
        )
        return response.json()
    } catch (error) {
        console.error('Error creating comment', error)
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await fetch(
            BASE_URL + `/delete-comment/${commentId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return response.json()
    } catch (error) {
        console.error('Error deleting comment', error)
    }
}

export const deletePost = async (postId) => {
    try {
        const response = await fetch(
            BASE_URL + `/delete/${postId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return response.json()
    } catch (error) {
        console.error('Error deleting post', error)
    }
}

export const updateComment = async (commentId, content) => {
    try {
        const response = await fetch(
            BASE_URL + `/update-comment/${commentId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content
                })
            }
        )
        return response.json()
    } catch (error) {
        console.error('Error updating comment', error)
    }
}

export const updatePost = async (postId, title, content) => {
    try {
        const response = await fetch(
            BASE_URL + `/update/${postId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content
                })
            }
        )
        return response.json()
    } catch (error) {
        console.error('Error updating post', error)
    }
}