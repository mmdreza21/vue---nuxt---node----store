<template>
  <v-form ref="form" v-model="valid" @submit.prevent="sub" lazy-validation>
    <v-row>
      <v-col cols="12" sm="3" md="6">
        <v-text-field
          label="name"
          v-model="edit.name"
          :rules="nameRules"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="6">
        <v-text-field
          label="price"
          :disabled="edit.isfree"
          v-model="edit.price"
          :rules="priceRules"
          outlined
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="3" md="6">
        <v-text-field
          label="image name"
          :rules="imageRules"
          v-model="edit.image"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="6">
        <v-text-field label="tag" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="6">
        <v-text-field
          label="number"
          v-model="edit.numberInStok"
          type="number"
          :rules="numberInStokRules"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="6">
        <v-select
          @change="chenge = false"
          :rules="selRules"
          v-model="edit.categoryId"
          :items="getcats.result"
          label="category"
          item-value="_id"
          item-text="name"
          outlined
          required
        ></v-select>
        <v-alert type="error" v-show="chenge" dense elevation="24">
          plese set the category again
        </v-alert>
      </v-col>
      <v-col cols="12" sm="3" md="6">
        <v-textarea
          label="about"
          v-model="edit.about"
          :rules="aboutRules"
          outlined
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="3" md="6">
        <v-checkbox label="free" v-model="edit.isfree" color="red"></v-checkbox>
      </v-col>
    </v-row>

    <v-divider inset></v-divider>
    <br />
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
      type="submit"
    >
      <v-icon> mdi-package-down</v-icon>edit!
    </v-btn>

    <v-btn color="primary" class="mr-4" @click="reset">
      <v-icon> mdi-refresh</v-icon>Reset Form
    </v-btn>
    <v-btn color="red" @click="delet">
      <v-icon>mdi-delete</v-icon> delet
    </v-btn>
    <v-btn color="red" to="/admin">
      <v-icon> mdi-backspace</v-icon> cancel
    </v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      edit: this.product
        ? {
            ...this.product
          }
        : {
            categoryId: undefined,
            isfree: false,
            name: "",
            valid: false,
            price: "free",
            numberInStok: 0,
            about: "",
            tag: [],
            image: ""
          },
      chenge: true,
      selRules: [v => !!v || "Name is required"],

      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length > 3) || "Name must be atlest than 3 characters"
      ],

      priceRules: [
        v => !!v || "price is required",
        v => (v && v.length >= 1) || "price must be lest than 2 characters"
      ],

      numberInStokRules: [v => !!v || "number is required"],

      valid: true,
      aboutRules: [
        v => !!v || "about is required",
        v => (v && v.length > 5) || "about must be atllest than 5 characters"
      ],

      valid: true,
      imageRules: [v => !!v || "image name is required"]
    };
  },

  methods: {
    delet() {
      var con = confirm("are you sure?");
      if (con == true) {
        this.$emit("del", this.edit);
      } else {
        alert("ok");
      }
    },
    sub() {
      this.$emit("submit", this.edit);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  computed: {
    getcats() {
      return this.$store.getters["admin/getcat"];
    }
  },
  created() {
    this.$store.dispatch("admin/getcat");
  }
};
</script>
