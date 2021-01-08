<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" text v-bind="attrs" v-on="on">
          ویرایش اطلاعات
        </v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="edit">
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.fname"
                    :rules="fnameRules"
                    label="first Name"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.lname"
                    :rules="lnameRules"
                    label="last Name"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field
                    type="phone"
                    v-model="user.phone"
                    :rules="phoneRules"
                    label="phone number"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-textarea
                    v-model="user.address"
                    :rules="addressRules"
                    label="Address"
                    required
                    outlined
                    dense
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              type="submit"
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    users: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: this.users
        ? { ...this.users }
        : {
            fname: "",
            phone: "",
            lname: "",
            address: ""
          },
      dialog: false,
      fnameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 3) || "Name must be grater than 3 characters"
      ],
      lnameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 3) || "Name must be grater than 3 characters"
      ],
      phoneRules: [
        v => !!v || "phone is required",
        v => /^09/.test(v) || "phone number must start whit 09",
        v => (v && v.length >= 11) || "phone must be valid nubmer "
      ],

      addressRules: [
        v => !!v || "addres is required",
        v => (v && v.length >= 11) || "address must be valid adress "
      ]
    };
  },
  methods: {
    edit() {
      this.$emit("sub", this.user);
    }
  }
};
</script>
