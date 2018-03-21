<template>
    <div>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile 
          value="true"
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.link"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> 
      <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="appName+title"></v-toolbar-title>
      <v-spacer></v-spacer>
    <v-btn flat @click="userSignOut" v-if="isAuthenticated">
      <v-icon left>exit_to_app</v-icon>
      Sign Out
    </v-btn>
    <v-btn
      flat
      v-for="(item, i) in toolbarItems"
      :key="i"
      :to="item.link">
      <v-icon left>{{ item.icon }}</v-icon>
      {{ item.title }}
    </v-btn>
    </v-toolbar>
    </div>
</template>
<script>
  export default {
    props: ['menuItems','title'],
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: ''
      }
    }, 
    computed: {
      appName() {
        return this.$store.getters.appTitle
      },
      isAuthenticated() {
        return (
          this.$store.getters.getUser !== null &&
          this.$store.getters.getUser !== undefined
        );
      },
      toolbarItems() {
        return this.isAuthenticated ? [] : [
          {
            icon: "lock_open",
            title: "Sign In",
            link: "/singin"
          }
        ];
      }
    },
    methods: {
      userSignOut() {
        this.$store.dispatch("userSignOut");
      }
    }
  }
</script>