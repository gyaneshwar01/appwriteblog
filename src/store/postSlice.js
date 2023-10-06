import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    createPost: (state, action) => {
      state.posts = [...state.posts, action.payload.post];
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.$id === action.payload.post.$id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => {
        post.$id != action.payload.$id;
      });
    },
  },
});

export default postSlice.reducer;
export const { addPosts, createPost, updatePost, deletePost } =
  postSlice.actions;
