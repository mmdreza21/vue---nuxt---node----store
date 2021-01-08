<template>
  <div class="shet">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="userLogin"
    >
      <v-container>
        <v-row justify="center" class="for">
          <v-col cols="12" md="7" sd="6">
            <v-text-field
              v-model="login.email"
              :rules="emailRules"
              label="E-mail"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="7" sd="6">
            <v-text-field
              type="password"
              v-model="login.password"
              :rules="passwordRules"
              label="password"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="5" md="4">
            <v-alert dense dir="rtl" type="error" v-if="error" :value="true">
              {{ error }}
            </v-alert>
          </v-col>
        </v-row>
        <v-divider inset></v-divider><br />

        <v-row justify="center">
          <v-btn
            dense
            :disabled="!valid"
            color="success"
            class="mr-4"
            type="submit"
            @click="validate"
          >
            login <v-icon color="white">mdi-check-all</v-icon>
          </v-btn>
          <v-btn dense color="error" to="/">
            cancel <v-icon color="yellow">mdi-file-cancel</v-icon>
          </v-btn>
        </v-row>
        <v-snackbar
          dir="rtl"
          top
          color="#D50000"
          v-model="snackbar"
          :timeout="timeout"
        >
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn
              icon
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 8000,
      error: "",

      login: {
        email: "",
        password: ""
      },
      valid: true,

      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "password is required"]
    };
  },

  methods: {
    async userLogin() {
      try {
        const res = await this.$auth.loginWith("local", {
          data: this.login
        });
        console.log(res);
        alert("welcom " + res.data.fullname);
        return Promise.resolve(res);
      } catch (err) {
        this.text = err.response.data;
        this.snackbar = true;
        console.log(err.response.data);
      }
    },
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>
<style scoped>
.for {
  margin-top: 20px;
}

.shet {
  position: relative;

  width: 600px;
  height: 300px;
  margin: auto;
  text-align: center;
}

.shet:before,
.shet:after {
  content: "";
  position: absolute;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  top: -3px;
  left: -3px;
  background: linear-gradient(
    45deg,
    #fc0050,
    #0000ff,
    #00ff00,
    #ff0000,
    #ffff00,
    #fc0050,
    #0000ff,
    #00ff00,
    #ff0000,
    #ffff00
  );
  background-size: 300%;
  z-index: -2;
  animation: sh 15s linear infinite;
}
.shet:after {
  filter: blur(30px);
}
@keyframes sh {
  0% {
    background-position: 0, 0;
  }
  50% {
    background-position: 300%, 0;
  }
  100% {
    background-position: 0, 0;
  }
}
</style>
