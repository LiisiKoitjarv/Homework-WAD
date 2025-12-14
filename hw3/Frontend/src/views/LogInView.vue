<template>
  <main class="main">
    <div class="loginbox">
      <p class="welcome"> Welcome to PostIt </p>
      <button id="blue" @click='this.$router.push("/signup")'> Create an account </button>
      <p> or </p>
      <p> Log in </p>

      <form @submit.prevent="onLogin">
        <label>
          <input id="email" type="text" placeholder="Email" v-model="email" required/>
        </label>
        <br>
        <label>
          <input id="password" type="password" placeholder="Password" v-model="password" />
        </label>
        <br>
        <button type="submit">Log in</button>

      </form>
    </div>
    <p v-if="apiError" class="error">{{  apiError }} </p>
  </main>
</template>

<script>
import { mapActions } from 'vuex'; 

export default {
  name: 'LogInView',
  data() {
    return {
      email: "",
      password: "",
      apiError: null, // Data field to hold backend errors
    };
  },


  methods: {
    // Map the Vuex 'login' action to 'this.signup'
    ...mapActions(['login']), 

    // Asynchronous method to handle login attempt
    async onLogin() {
        this.apiError = null; // Clear previous API error
        
        try {
            await this.login({
                email: this.email,
                password: this.password
            });
            this.$router.push({name:'home'});
        } catch (err) {
            this.apiError = "Invalid email or password"
        }
    }
  }

};
</script>


<style scoped>
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
}

.loginbox {
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  background: none;
  border: none;
  cursor: pointer;
}

#blue:hover {
    color: #368ea8;
}

#email, #password { 
  width: 250px;
  height: 30px;
  font-size: 20;
  margin: 5px;
}

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

main p {
  text-align: center;
}

main p ul li {
  color:#272727;
  text-align: left;
}

p ~ p {
  font-size: 25px;
  margin: 5px;
}

</style>