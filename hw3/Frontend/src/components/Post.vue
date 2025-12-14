<template>
  <div class="post" @click="openPost">
    <div class="post-header">
      <img :src="postAuthorAvatar" alt="Author logo" class="author-logo"/>
      <div>
        <h3>{{ postAuthorName }}</h3> 
        <small>{{ formattedDate }}</small>
      </div>
    </div>
    <p class="post-text">{{ post.text }}</p>
    <img v-if="post.image_url" :src="post.image_url" alt="Post image" class="post-image"/>
    <div class="post-footer">
      <button @click.stop="like" class="like-button">
        <img :src="require('@/assets/images/likebutton.png')" alt="Like" class="like-icon"/>
        <span>{{ post.likes || 0 }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Post',
  props: { post: Object },

  computed: {
    ...mapState(['users']),
    formattedDate() { return new Date(this.post.created_at).toLocaleString() },
    postAuthorName() {
      const author = this.users.find(u => u.user_id === this.post.user_id)
      return author ? author.email : this.post.author || 'Unknown User'
    },
    postAuthorAvatar() {
      return require('@/assets/images/hw1icon.png') // fallback avatar
    }
  },

  methods: {
    ...mapActions(['likePost']),
    like() { this.likePost(this.post.id) },
    openPost() { this.$router.push({ name: 'PostPage', params: { id: this.post.id } }) }
  }
}
</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer; 
  transition: background-color 0.2s;
}
.post:hover {
  background-color: #f0f0f0;
}
.post-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.author-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.post-text {
  margin-bottom: 10px;
}
.post-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 10px;
}
.post-footer .like-button {
  display: flex;
  align-items: center;
  gap: 5px; 
  cursor: pointer;
  background-color: transparent; 
  border: none;
  padding: 5px;
}
.post-footer .like-icon {
  width: 20px;
  height: 20px;
}
</style>
