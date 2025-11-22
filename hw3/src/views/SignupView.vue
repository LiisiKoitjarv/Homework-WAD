<template>
  <main class="main">
    <div class="loginbox">
      <p class="welcome"> Welcome to PostIt </p>
      <p id="blue"> Log in </p>
      <p> or </p>
      <p> Create an account </p>

      <form @submit="onSignup">
        <label>
          <input id="email" type="text" placeholder="Email" v-model="email" required/>
        </label>
        <br>
        <label>
          <input id="password" type="password" placeholder="Password" v-model="password" />
        </label>
        <br>
        <button type="submit">Sign up</button>

      </form>
    </div>
    <p v-if="errors.length">
          <strong>The password is not valid:</strong>
          <ul>
            <li v-for="(err, i) in errors" :key="i">{{ err }}</li>
          </ul>
    </p>
  </main>
</template>

<script>
export default {
  name: 'SignupView',
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },

  watch: {
    password() {
      this.validatePassword();
    }
  },

  methods: {
    validatePassword() {
      const passw = this.password;
      this.errors = [];

      if (passw.length<8 || passw.length>15){
        this.errors.push("Password length should be 8-15 characters.");
      }
      if(!/[A-Z]/.test(passw)){
        this.errors.push("Password has to have at least one uppercase letter.");
      }
      if((passw.match(/[a-z]/g) || []).length<2){
        this.errors.push("Password has to have at least two lowercase letters.");
      }
      if(!/[0-9]/.test(passw)){
        this.errors.push("Password has to have at least one number.");
      }
      if(!/^[A-Z]/.test(passw)){
        this.errors.push("Password has to start with an uppercase letter.");
      }
      if(!/_/.test(passw)){
        this.errors.push("Password has to have '_' character.");
      } 
      return this.errors.length === 0;
    },

    onSignup() {
        this.validatePassword();
        if(this.errors.length === 0) {
          alert("Signed up");
          this.$router.push('/');
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

/* login area style */
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
}

#email, #password { 
  width: 250px;
  height: 30px;
  font-size: 20;
  margin: 5px;
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