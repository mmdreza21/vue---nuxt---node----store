<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card shaped>
        <div class="text"><h2>ورود</h2></div>
        <v-form
          class="pad"
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="userLogin"
        >
          <v-container class="pad">
            <v-row justify="center" class="pad">
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

            <v-row justify="center" class="pad">
              <v-col cols="5" md="4">
                <v-alert
                  dense
                  dir="rtl"
                  type="error"
                  v-if="error"
                  :value="true"
                >
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
              >
                <v-icon color="white">mdi-check-all</v-icon>
                ورود
              </v-btn>
              <v-btn dense color="primary" to="/user" class="mr-4">
                <v-icon color="white">mdi-form-select</v-icon>
                ثبت نام
              </v-btn>
              <v-btn dense color="error" @click="dialog = false">
                <v-icon color="yellow">mdi-file-cancel</v-icon>
                انصراف
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
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: { type: Boolean, default: false }
  },
  data() {
    return {
      log: true,
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
    }
  },
  computed: {}
};
</script>
<style scoped>
.text {
  text-align: center;
  color: darkred;
}
</style>
