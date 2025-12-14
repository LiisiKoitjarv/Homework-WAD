<template>
  <div class="home">
    <div class="content-container"> 
      <!-- Post list component -->
      <PostList @postClick="goToPost" />

      <!-- Action buttons -->
      <div class="action-buttons">
        <router-link to="/add" class="add-post-button">Add Post</router-link> 
        <button @click="deleteAllPosts" class="reset-posts-button">Delete All Posts</button>
        <button @click="logoutUser" class="logout-button">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PostList from '@/components/PostList.vue'

export default {
  name: 'HomeView',
  components: { PostList },

  created() {
    // Authenticate and fetch posts automatically
    this.authenticate()
      .then(authenticated => {
        if (!authenticated) this.$router.push({ name: 'login' })
      })
      .catch(err => console.error('Authentication failed', err))
  },

  methods: {
    ...mapActions(['authenticate', 'resetAllPosts', 'logout']),

    goToPost(id) {
      this.$router.push({ name: 'post', params: { id } })
    },

    async deleteAllPosts() {
      if (confirm('Are you sure you want to delete all posts?')) {
        try {
          await this.resetAllPosts()
          alert('All posts have been deleted.')
        } catch (error) {
          alert('Error deleting posts: ' + error.message)
        }
      }
    },

    async logoutUser() {
      try {
        await this.logout()
        this.$router.push({ name: 'login' })
      } catch (error) {
        console.error('Logout failed', error)
      }
    }
  }
}
</script>

<style>
.home { 
  padding: 20px; 
  background-color: 
  aliceblue; 
  min-height: 100vh; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
}
.content-container { 
  width: 100%; 
  max-width: 600px; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
}
.action-buttons { 
  display: flex; 
  justify-content: space-between; 
  width: 100%; 
  max-width: 600px; 
  padding: 10px 0; 
  margin-top: 20px; 
}

.add-post-button, 
.reset-posts-button, 
.logout-button { 
  padding: 8px 15px; 
  border-radius: 5px; 
  font-size: 15px; 
  cursor: pointer; 
  text-decoration: none; 
  text-align: center; 
  border: none; 
  color: white; 
}
.add-post-button { 
  background-color: #4cc1e4; 
}
.add-post-button:hover { 
  background-color: #3aa3c7; 
}
.reset-posts-button { 
  background-color: #e04c4c; 
}
.reset-posts-button:hover { 
  background-color: #c73a3a; 
}
.logout-button { 
  background-color: #4cc14c; 
}
.logout-button:hover { 
  background-color: #3aa33a; 
}
</style>
