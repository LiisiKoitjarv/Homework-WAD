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
    }
  },
  actions: {
    likePost({ commit }, postId) {
      commit('incrementLikes', postId)
    }
  }
})