<template>
  <div class="add-post-page">
    <div class="center-box">
      <h2>Add Post</h2>
      <div class="row">
        <label for="body">Body</label>
        <input id="body" v-model="body" placeholder="Write your message here..." />
      </div>

      <div class="button-row">
        <button @click="createPost">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
  import hw1icon from '@/assets/images/hw1icon.png'


  export default {
    name: 'AddPostView',
    data() {
      return {
        body: ''
      }
    },
    methods: {
      createPost() {
        if (!this.body) return
        const newPost = {
          text: this.body,
          created_at: new Date().toISOString(),
          author: 'user', // TODO get actual username
          logo: hw1icon, // default profile pic
        }
        this.$store.dispatch('addPost', newPost)
        .then(() => {
          this.$router.push({ name: 'home' })
        })
      }
    }
  }
</script>

<style scoped>
.add-post-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  background-color: aliceblue;
}

.center-box {
  width: 520px;
  background-color: #f6f9f2;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 0 0 12px rgba(0,0,0,0.03) inset;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.center-box h2 {
  margin: 0;
  font-family: monospace;
  font-size: 30px;
}

.row {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.row label {
  font-family: monospace;
  font-weight: bold;
  padding: 20px;
  font-size: 20px;
}

.row input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.button-row {
  width: 100%;
  display:flex;
  justify-content:center;
}
.button-row button {
  padding: 8px 28px;
  border-radius: 10px;
  border: none;
  background-color: #2d5fa6;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

</style>
