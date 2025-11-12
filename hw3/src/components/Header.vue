<template>
    <header class="header">
      <ul class="nav">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/signup">Signup</router-link></li>
      </ul>
      <div class="profile-menu">
          <img src="@\assets\images\hw1icon.png" width="50" height="50" alt="My picture" class="logo">
      </div>
  </header>
</template>

<script>

export default {
    name: 'AppHeader',
}
</script>

<style scoped>
.header {
  padding-top: .5em;
  padding-bottom: .5em;
  background-color: white;
  position: static;
  width: 100%;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.logo {
  border-radius: 8px;
}

.nav {
  margin-top: 5px;
  margin-left: 15px;
}

.nav a {
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: block;
  color: #000000;
  font-size: 1.4em;
  font-family: monospace;
}

.nav a:hover {
  background-color: gainsboro;
  border-radius: 5px;
  color: #000000;
}

.nav a.router-link-exact-active {
  color: #2d5fa6;
}

@media (min-width: 300px) {
  .header,
  .nav {
    display: flex;
  }
  .header {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>