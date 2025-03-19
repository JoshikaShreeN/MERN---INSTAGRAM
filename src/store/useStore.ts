import { create } from 'zustand';

interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
  likes: number;
  caption: string;
  comments: Comment[];
  isLiked: boolean;
  isBookmarked: boolean;
}

interface Comment {
  id: number;
  username: string;
  text: string;
}

interface Store {
  posts: Post[];
  addComment: (postId: number, text: string) => void;
  toggleLike: (postId: number) => void;
  toggleBookmark: (postId: number) => void;
}

const useStore = create<Store>((set) => ({
  posts: [
    {
      id: 1,
      username: 'johndoe',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop',
      likes: 123,
      caption: 'Beautiful sunset at the beach! 🌅',
      comments: [
        { id: 1, username: 'janedoe', text: 'Amazing view! 😍' },
        { id: 2, username: 'mike_smith', text: 'Where is this?' }
      ],
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      username: 'janedoe',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      image: 'https://images.unsplash.com/photo-1682687221038-404670d5f335?w=600&h=600&fit=crop',
      likes: 456,
      caption: 'Coffee time ☕️',
      comments: [
        { id: 1, username: 'coffeemaster', text: 'Perfect brew!' },
        { id: 2, username: 'sarah.k', text: 'Love this cafe!' }
      ],
      isLiked: false,
      isBookmarked: false
    }
  ],
  addComment: (postId, text) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  username: 'currentuser',
                  text
                }
              ]
            }
          : post
      )
    })),
  toggleLike: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    })),
  toggleBookmark: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    }))
}));

export default useStore;