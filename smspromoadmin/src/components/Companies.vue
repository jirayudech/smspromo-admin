<template>
  <v-card>
    <v-layout row>
      <v-card-text class="text-lg-left">
        <v-layout row>
        <v-flex xs6>
          <v-text-field
            name="search"
            label="Search"
            id="search"
          >
          </v-text-field>
        </v-flex><v-icon left>search</v-icon> 
        </v-layout>
      </v-card-text>
         
      <v-card-text v-if="userIsAdmin" class="text-lg-right">
        <v-btn color="primary"  id="addButton" to="/companyadd">
          <v-icon dark left>add_circle</v-icon> Add Company
        </v-btn>
      </v-card-text>
    </v-layout>

  <v-data-table
    v-bind:headers="headers"
    v-bind:items="companies"
    v-bind:search="searchQuery"
    hide-actions
    v-model="selected"
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.companyName }}</td>
<!--       <td class="text-xs-left">{{ props.item.companyContactName }}</td>
      <td class="text-xs-left">{{ props.item.companyContactNumber }}</td> -->
<!--       <td v-if="userIsAdmin" class="text-xs-center">
        <v-btn flat small color="warning">Edit</v-btn>
      </td> -->
      <td v-if="userIsAdmin" class="text-xs-center">
        <v-btn flat small color="error">Disable</v-btn>
      </td>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>

import {companiesRef} from '../main';

export default {
  name: 'HelloWorld',
  addCampaign: true,
  data () {
    if(this.$store.getters.getUser.userType == 'admin' && this.$store.getters.getUser !== null){
    return {
      headers: [
        { text: 'Name',sortable: true,align: 'center' },
/*         { text: 'Contact Name',sortable: true,align: 'center' },
        { text: 'Contact Number',sortable: true,align: 'center' }, */
/*         { text: 'Edit',sortable: false,align: 'center' }, */
        { text: 'Disable',sortable: false,align: 'center' },
      ]
    }
    }
    return {
      headers: [
        { text: 'Clients',sortable: true,align: 'center' },
        { text: 'Campaign Picture',sortable: false,align: 'center' },
        { text: 'Campaign Headers',sortable: true,align: 'center' },
      ]
    }
  },
  firebase: function (){
    if(this.$store.getters.getUser.userType == 'admin' && this.$store.getters.getUser !== null ){
      return { companies: companiesRef} 
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
          this.$store.getters.getUser.userType == 'admin' && this.$store.getters.getUser !== null 
        );
      }
  },
  methods: {
    submitCampaign(){
      campainsRef.push({campaign_header: this.campaignHeader})  
    },
    setPage() {
        this.$store.dispatch("setPage","Clients");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}

#addButton {
  border: 2px solid black;
  padding: 3px
}

input {
  border: 2px solid black;
  padding: 3px
}
</style>
