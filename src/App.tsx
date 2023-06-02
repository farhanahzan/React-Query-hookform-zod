import { Route, Routes } from 'react-router-dom';
import Post from './pages/Post';
import blogIcon from './assets/blog.svg'

import EditPost from './pages/EditPost';
import PostList from './pages/PostList';
function App() {
  return (
    <div className="w-full flex flex-col h-screen py-6 justify-start items-center px-4 sm:px-0">
      <div className="flex flex-row justify-center items-center gap-2 mb-6">
        <img src={blogIcon} alt="blog icon" className="w-8 drop-shadow-md" />
        <h1 className="text-4xl font-semibold text-gray-800 uppercase drop-shadow-md">
          Awesome blog
        </h1>
      </div>
      <>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
