<template>
  <div class="home">
    <PostList />
    <br>
    <div class="resetButton">
      <button @click="resetLikes" class="resetLikesButton">Reset likes</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PostList from '@/components/PostList.vue'

export default {
  name: 'HomeView',
  components: { PostList },
  
  methods:{
    ...mapActions(['resetAllLikes']),
    resetLikes() {
      this.resetAllLikes();
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;          
  background-color: aliceblue;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
   align-items: center; 
}

.posts-container {
  width: 100%;
  max-width: 600px;       
  display: flex;
  flex-direction: column;
  gap: 15px;               
}

.resetButton{
  display: flex;
  justify-content: center;
  align-items: center;
}
.resetLikesButton {
  background-color: #2d5fa6;
  color: #ffffff;
  box-shadow: none;
  border-style: none;
  font-size: 15px;
  padding: 5px 15px;
  margin-top: 10px;
  cursor: pointer;
}

</style>