import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, PlusSquare, Home as HomeIcon, Search, User, Instagram } from 'lucide-react';
import useStore from '../store/useStore';

function Home() {
  const { posts, addComment, toggleLike, toggleBookmark } = useStore();
  const [commentText, setCommentText] = useState<string>('');
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);

  const handleCommentSubmit = (postId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(postId, commentText.trim());
      setCommentText('');
      setActiveCommentId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <Instagram className="h-8 w-8 text-pink-500" />
          <div className="flex space-x-4">
            <PlusSquare className="h-6 w-6 text-gray-700 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto pt-16 pb-20">
        {/* Posts */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-lg">
              {/* Post Header */}
              <div className="flex items-center p-4">
                <img src={post.avatar} alt={post.username} className="h-8 w-8 rounded-full" />
                <span className="ml-3 font-medium">{post.username}</span>
              </div>

              {/* Post Image */}
              <img src={post.image} alt="" className="w-full" />

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <Heart
                      className={`h-6 w-6 cursor-pointer ${post.isLiked ? 'fill-red-500 stroke-red-500' : ''}`}
                      onClick={() => toggleLike(post.id)}
                    />
                    <MessageCircle
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                    />
                    <Share2 className="h-6 w-6 cursor-pointer" />
                  </div>
                  <Bookmark
                    className={`h-6 w-6 cursor-pointer ${post.isBookmarked ? 'fill-black' : ''}`}
                    onClick={() => toggleBookmark(post.id)}
                  />
                </div>
                <div className="mt-2">
                  <span className="font-medium">{post.likes} likes</span>
                </div>
                <div className="mt-2">
                  <span className="font-medium">{post.username}</span> {post.caption}
                </div>

                {/* Comments */}
                <div className="mt-2">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="mt-1">
                      <span className="font-medium">{comment.username}</span> {comment.text}
                    </div>
                  ))}
                </div>

                {/* Comment Form */}
                {activeCommentId === post.id && (
                  <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="mt-4">
                    <div className="flex">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 border border-gray-200 rounded-l-lg px-4 py-2 focus:outline-none focus:border-gray-400"
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
                      >
                        Post
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-around">
            <HomeIcon className="h-6 w-6 text-gray-900" />
            <Search className="h-6 w-6 text-gray-500" />
            <PlusSquare className="h-6 w-6 text-gray-500" />
            <Heart className="h-6 w-6 text-gray-500" />
            <User className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Home;