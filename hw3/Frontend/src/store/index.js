import { createStore } from 'vuex'

const API_URL = 'http://localhost:3000'; 

export default createStore({
  state: {
    posts: [], 
    isAuthenticated: false,
    user: null, 
    users: [],
  },
  getters: {
    allPosts(state) {
      return state.posts
    },
    isAuthenticated(state) {
      return state.isAuthenticated
    },
    currentUser(state) {
      return state.user
    },
    allUsers(state) { 
      return state.users
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts.reverse();
    },
    addPost(state, post) {
      state.posts.unshift(post)
    },
    updatePost(state, updatedPost) {
      const index = state.posts.findIndex(p => p.id === updatedPost.id)
      if (index !== -1) state.posts.splice(index, 1, updatedPost) 
    },
    deletePost(state, id) {
      state.posts = state.posts.filter(p => p.id !== id)
    },
    setUsers(state, users) { 
      state.users = users;
    },
    setUser(state, {userPayload, token}) {
      state.user = userPayload;
      state.token = token;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.posts = [];
      state.users = []; 
    }
  },
  actions: {
    // --- Authentication ---
    async authenticate({ commit, dispatch }) {
      const token = localStorage.getItem('token');
      if (!token) {
        commit('clearUser');
        return false;
      }

      const response = await fetch(`${API_URL}/auth/authenticate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`  
        },
        credentials: 'include', 
      });

      const data = await response.json();
      if (data.authenticated) {
        commit('setUser', { userPayload: { user_id: data.user_id, email: 'Authenticated User' }, token });
        await dispatch('fetchPosts');
        return true;
      } else {
        commit('clearUser');
        return false;
      }
    },

    async logout({ commit }) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
      });
      commit('clearUser');
    },

    // --- Posts ---
    async fetchPosts({ commit }) {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (response.ok) {
        const posts = await response.json();
        commit('setPosts', posts);
      } else {
        console.error('Failed to fetch posts:', response.statusText);
      }
    },

    async signup({ commit }, payload) {
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if(!res.ok){
        throw new Error('Signup failed');
      }
      const data = await res.json();

      localStorage.setItem('token', data.token);
      commit('setUser', {userPayload: {user_id: data.user_id, email: data.email }, token: data.token});
      return true;
    },

    async login({ commit }, payload) {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if(!res.ok) {
        throw new Error("Login failed");
      }
      const data = await res.json();

      localStorage.setItem('token', data.token);
      commit('setUser', {userPayload: {user_id: data.user_id, email:data.email}, token:data.token});

      return true;
    },

    async resetAllPosts({ commit }) {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        commit('setPosts', []);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete all posts');
      }
    },

    async likePost({ commit }, postId) {
      const response = await fetch(`${API_URL}/api/posts/${postId}/like`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) commit('incrementLikes', postId)
      else throw new Error(data.error || 'Failed to like post');
    },

    async updatePost({ commit }, updatedPost) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/posts/${updatedPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedPost),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update post');
    }

    const savedPost = await response.json();
    commit('updatePost', savedPost);
    return true;
  },

  async deletePostById({ commit }, postId) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete post');
    }

    commit('deletePost', postId);
    return true;
  },
  async addPost({ commit }, post) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(post),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add post');
    }

    const savedPost = await response.json();
    commit('addPost', savedPost);

    return true;
  }
}
})
