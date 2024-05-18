import logo from './logo.svg';
import './App.css';
import BlogPostsDisplay from './components/BlogPostsDisplay/BlogPostsDisplay';
import NewBlogPostForm from './components/NewBlogPostForm/NewBlogPostForm';

function App() {
  return (
    <div className="App">
      <h1>Reango Blog</h1>
      <NewBlogPostForm /> 
      <BlogPostsDisplay />
    </div>
  );
}

export default App;
