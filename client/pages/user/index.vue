<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="sub">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="fname"
            :rules="fnameRules"
            label="first Name"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="lname"
            :rules="lnameRules"
            label="last Name"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="7">
          <v-text-field
            type="phone"
            v-model="phone"
            :rules="phoneRules"
            label="phone number"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="7">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="7">
          <v-textarea
            v-model="address"
            :rules="addressRules"
            label="Address"
            required
            outlined
            dense
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="password"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            type="password"
            v-model="repassword"
            :rules="rules"
            label=" password again"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      dir="rtl"
      top
      color="#D50000"
      v-model="geterr"
      :timeout="timeout"
    >
      {{ geterr }}
    </v-snackbar>

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
        submit <v-icon color="white">mdi-check-all</v-icon>
      </v-btn>

      <v-btn dense color="primary" class="mr-4" @click="reset">
        Reset Form <v-icon color="red">mdi-refresh</v-icon>
      </v-btn>

      <v-btn dense color="error" to="/">
        cancel <v-icon color="yellow">mdi-file-cancel</v-icon>
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      timeout: 2000,
      valid: true,
      fname: "",
      fnameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 3) || "Name must be grater than 3 characters"
      ],
      lname: "",
      lnameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 3) || "Name must be grater than 3 characters"
      ],
      phone: "",
      phoneRules: [
        v => !!v || "phone is required",
        v => /^09/.test(v) || "phone number must start whit 09",
        v => (v && v.length >= 11) || "phone must be valid nubmer "
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      address: "",
      addressRules: [
        v => !!v || "addres is required",
        v => (v && v.length >= 11) || "address must be valid adress "
      ],
      password: "",
      passwordRules: [
        v => !!v || "password is required",
        v => (v && v.length >= 6) || "password isnot strong ",
        v => /(?=.*\d)(?=.*[A-z])/.test(v) || "password isnot strong "
      ],
      repassword: ""
    };
  },

  computed: {
    rules() {
      const rules = [];
      if (this.repassword) {
        const rule = v => (!!v && v) === this.password || "Values do not match";
        rules.push(rule);
      }
      return rules;
    },
    ...mapGetters({
      geterr: "submit/getErr"
    }),
    geterr: {
      get() {
        return this.$store.getters["submit/getErr"];
      },
      set(newerr) {
        return newerr;
      }
    }
  },

  methods: {
    sub() {
      const user = {
        fname: this.fname,
        lname: this.lname,
        phone: this.phone,
        email: this.email,
        address: this.address,
        password: this.password
      };
      this.$store.dispatch("submit/postuser", user).then(() => {
        this.$router.push("/login");
      });
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
