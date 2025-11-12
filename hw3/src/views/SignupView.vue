<template>
  <main class="main">
    <div class="loginbox">
      <p class="welcome"> Welcome to PostIt </p>
      <p id="blue"> Create an account </p>
      <p> or </p>
      <p> Log in </p>

      <form @submit="onSignup">
        <label>
          Email
          <input id="email" type="text" placeholder="Email">
        </label>
        <label>
          Password
          <input id="password" type="password" placeholder="Password" />
        </label>

        <button type="submit">Sign up</button>

      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: 'SignupView',
  methods: {
    onSignup() {
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: aliceblue;
}

/* login area style */
.loginbox {
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  text-align: center;
  font-family: monospace;
}

.welcome {
  font-weight: bold;
  font-size: 25px;
}

#blue {
  font-size: 25px;
  color: #4cc1e4;
}

#email, #password {
  width: 300px;
  height: 40px;
  font-size: 20;
  padding: 10px;
}

/* 'Sign up' button style */
form button {
  background-color: #2d5fa6;
  color: #ffffff;
  box-shadow: none;
  border-style: none;
  font-size: 25px;
  padding: 5px 15px;
  margin-top: 10px;
  cursor: pointer;
}

form button:hover {
  background-color: #244a82;
}

p ~ p {
  font-size: 25px;
  margin: 5px;
}

</style>