<template>
  <div class="post" @click="openPost">
    <!-- Author info -->
    <div class="post-header">
      <img :src="post.logo" alt="Author logo" class="author-logo"/>
      <div>
        <h3>{{ post.author }}</h3>
        <small>{{ formattedDate }}</small>
      </div>
    </div>

    <!-- Post text -->
    <p class="post-text">{{ post.text }}</p>

    <!-- Post image if it exists -->
    <img v-if="post.image_url" :src="post.image_url" alt="Post image" class="post-image"/>

    <!-- Likes -->
    <div class="post-footer">
      <button @click.stop="like" class="like-button">
        <img :src="require('@/assets/images/likebutton.png')" alt="Like" class="like-icon"/>
        <span>{{ post.likes }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Post',
  props: {
    post: Object
  },
  computed: {
    formattedDate() {
      return new Date(this.post.created_at).toLocaleString()
    }
  },
  methods: {
    ...mapActions(['likePost']),
    like() {
      this.likePost(this.post.id)
    },
    openPost() {
      this.$router.push({ name: 'post', params: { id: this.post.id } })
    }
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
