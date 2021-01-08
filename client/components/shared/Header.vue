<template>
  <div dir="rtl">
    <v-navigation-drawer
      right
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      shrink-on-scroll
      elevate-on-scroll
      :src="require(`@/assets/image/header-1.png`)"
      prominent
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-btn text color="red accent-3" exact :to="{ name: 'index' }">
        Home <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn color="red accent-3" :to="{ name: 'product' }" text>
        محصولات<v-icon>mdi-store-outline</v-icon>
      </v-btn>
      <v-btn
        text
        color="red accent-3"
        v-if="$auth.loggedIn"
        exact
        :to="{ name: 'order' }"
      >
        card <v-icon>mdi-basket-outline</v-icon>
      </v-btn>

      <v-btn
        color="red accent-3"
        v-if="$auth.loggedIn && $auth.user.isAdmin"
        :to="{ name: 'admin' }"
        text
      >
        admin area <v-icon>mdi-account-cowboy-hat</v-icon>
      </v-btn>

      <v-spacer />
      <v-toolbar-title v-if="!$auth.loggedIn" v-text="title" />
      <v-toolbar-title v-else color="success" v-text="title2" />
      <v-spacer />

      <v-btn
        text
        color="red accent-3"
        v-if="$auth.loggedIn"
        exact
        :to="{ name: 'profile' }"
      >
        profile <v-icon> mdi-clipboard-account-outline</v-icon>
      </v-btn>

      <v-btn
        color="red accent-3"
        v-if="!$auth.loggedIn"
        :to="{ name: 'user' }"
        text
      >
        signup <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>
      <v-btn @click="getout" color="red accent-3" v-else text>
        logOut <v-icon>mdi-export</v-icon>
      </v-btn>

      <v-btn
        color="red accent-3"
        v-if="!$auth.loggedIn"
        :to="{ name: 'login' }"
        text
      >
        login <v-icon>mdi-login-variant</v-icon>
      </v-btn>

      <v-btn color="red accent-3" :to="{ name: 'about' }" text>
        about <v-icon>mdi-book-information-variant</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,

      items: [
        {
          icon: "mdi-home-outline",
          title: "home",
          to: "/"
        },
        {
          icon: "mdi-store-outline",
          title: "products",
          to: "/product"
        },
        {
          icon: "mdi-information-outline",
          title: "about",
          to: "/about"
        }
      ],
      miniVariant: false,

      title: "P",
      title2: `welcom ${this.$auth.user ? this.$auth.user.fullname : "unkown"}`
    };
  },
  methods: {
    async getout() {
      try {
        await this.$auth.logout("locale");
        alert(" logged out");
      } catch (e) {
        throw e;
      }
    }
  }
};
</script>
