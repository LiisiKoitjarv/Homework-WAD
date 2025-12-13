import { createStore } from 'vuex'
import postData from '../../json/myjson.json'
console.log(postData)

export default createStore({
  state: {
    posts: postData.map(post => ({ ...post, likes: post.likes || 0 })), 
  },
  getters: {
    allPosts(state) {
      return state.posts
    }
  },
  mutations: {
    incrementLikes(state, postId) {
      const post = state.posts.find(p => p.id === postId)
      if (post) post.likes++
    },
    resetLikes(state) {
      state.posts.forEach(post => {
        post.likes = 0
      });
    },
    addPost(state, post) {
      const newId =
        state.posts.length > 0 ? Math.max(...state.posts.map(p => p.id)) + 1 : 1

      const newPost = {
        id: newId,
        text: post.text,
        created_at: post.created_at,
        author: post.author,
        logo: post.logo,
        likes: 0
      }

      state.posts.push(newPost)
      return newId
    },
    updatePost(state, payload) {
      const post = state.posts.find(p => p.id === payload.id)
      if (post) {
        post.text = payload.text
      }
    },
    deletePost(state, id) {
      state.posts = state.posts.filter(p => p.id !== id)
    }
  },
  actions: {
    likePost({ commit }, postId) {
      commit('incrementLikes', postId)
    },
    resetAllLikes({ commit }) {
      commit('resetLikes')
    },
    addPost({ commit }, post) {
      return new Promise((resolve) => {
        const id = commit('addPost', post)
        resolve(id)
      })
    }
  }
})