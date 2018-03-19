<template>
  <v-app>
    <navigation :menuItems="menuItems" :title="title"></navigation>

    <v-content>
      <v-container fluid>
        <!-- Redered Content Show Here. -->
        <router-view></router-view> 
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; RGT Soft 2017</span>
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
      isAuthenticated() {
        return (
          this.$store.getters.getUser !== null &&
          this.$store.getters.getUser !== undefined
        );
      },
      userIsAdmin() {
        return (
          this.$store.getters.getUser.userType == 'admin' && 
          this.$store.getters.getUser !== null 
        );
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
                  link: '/usersadmin'
                },{
                  icon: 'contacts',
                  title: 'Companies',
                  link: '/companies'
                },{
                  icon: 'contacts',
                  title: 'Brands',
                  link: '/brands'
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
                  link: '/campaigns'
                },{
                  icon: 'contacts',
                  title: 'Users',
                  link: '/users'
                },                
                {
                  icon: 'settings',
                  title: 'Settings',
                  link: '/settings'
                }
          ]
        }
        return menuItems
      }
    },
    beforeUpdate () {
      this.title = document.title
    }
  }
</script> 
