<template>
  <div>
    <Post 
      v-for="post in allPosts" 
      :key="post.id" 
      :post="post"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Post from './Post.vue'

export default {
  components: { Post },
  computed: {
    ...mapGetters(['allPosts'])
  },
  methods: {
    handleClick(id) {
      this.$emit('postClick', id)
    }
  }
}
</script>
