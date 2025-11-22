<template>
  <div class="home">
    <PostList />
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'

export default {
  name: 'HomeView',
  components: { PostList }
}
</script>

<style scoped>
.home {
  padding: 20px;          
  background-color: aliceblue;
  min-height: 100vh;
  display: flex;
  justify-content: center; 
}

.posts-container {
  width: 100%;
  max-width: 600px;       
  display: flex;
  flex-direction: column;
  gap: 15px;               
}
</style>