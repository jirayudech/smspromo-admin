<template>
  <v-app>
    <navigation></navigation>

    <v-content>
      <v-container fluid>
        <!-- Redered Content Show Here. -->
        <router-view></router-view> 
      </v-container>
    </v-content>
    
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>


    <v-footer :fixed="fixed" app>
      <span>&copy; RGT 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
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
      userIsAdmin() {
        return (
          //this.$store.getters.getUser.userType == 'admin' && 
          this.$store.getters.getUser !== null 
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
      },
      menuItems () {
        let menuItems = []
        if (this.isAuthenticated && this.userIsAdmin) {
          menuItems = [
                {
                  icon: 'home',
                  title: 'Campaigns',
                  link: '/'
                },{
                  icon: 'contacts',
                  title: 'Users',
                  link: '/users'
                },{
                  icon: 'contacts',
                  title: 'Clients',
                  link: '/clients'
                },{
                  icon: 'settings_phone',
                  title: 'Operators',
                  link: '/operators'
                },{
                  icon: 'settings',
                  title: 'Settings',
                  link: '/settings'
                }
          ]
        } else if (this.isAuthenticated && !this.userIsAdmin) {
          menuItems = [
                {
                  icon: 'home',
                  title: 'Campaigns',
                  link: '/'
                },{
                  icon: 'contacts',
                  title: 'Clients',
                  link: '/clients'
                },{
                  icon: 'settings',
                  title: 'Settings',
                  link: '/settings'
                }
          ]
        }
        return menuItems
      }
    },
    methods: {
      userSignOut() {
        this.$store.dispatch("userSignOut");
      }
    },
    beforeUpdate () {
      this.title = document.title
    }
  }
</script>
