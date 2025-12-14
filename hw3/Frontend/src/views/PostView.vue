<template>
  <div class="post-page">
    <div class="center-box" v-if="post">
      <h2>A Post</h2>

      <div class="row">
        <label>Body</label>
        <input v-model="editedText" />
      </div>

      <div class="button-row">
        <button @click="updatePost">Update</button>
        <button class="delete" @click="deletePost">Delete</button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'PostView',
  props: ['id'],
  data() {
    return {
      editedText: ''
    }
  },
  computed: {
    ...mapState(['posts']),
    post() {
      return this.posts.find(p => p.id === Number(this.id))
    }
  },
  mounted() {
    if (this.post) {
      this.editedText = this.post.text
    }
  },
  methods: {
    updatePost() {
      this.$store.commit('updatePost', {
        id: this.post.id,
        text: this.editedText
      })
      this.$router.push('/')
    },
    deletePost() {
      this.$store.commit('deletePost', this.post.id)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.post-page {
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
  display: flex;
  justify-content: center;
  gap: 16px;
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

.button-row .delete {
  background-color: #2d5fa6;
;
}
</style>
