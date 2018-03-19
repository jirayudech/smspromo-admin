<template>
  <v-card>
    <v-card-text class="text-lg-right">
        <v-btn color="primary"  id="addButton" to="/useradd">
          <v-icon dark left>add_circle</v-icon> User Add
        </v-btn>
    </v-card-text>

  <v-data-table
    v-bind:headers="headers"
    v-bind:items="users"
    v-bind:search="search"
    v-model="selected"
    item-key="name"
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
<!--       <td class="text-xs-left">{{ props.item['.key'] }}</td>
 -->      
      <td class="text-xs-left">{{ props.item.companyName}}</td>
      <td class="text-xs-left">{{ props.item.name + " " + props.item.surname}}</td>
      <td class="text-xs-left">{{ props.item.identifier }}</td>
<!--       <td class="text-xs-center">
        <v-btn flat small color="warning">Edit</v-btn>
      </td> -->
      <td class="text-xs-center">
        <v-btn flat small color="error">Disable</v-btn>
      </td>
    </template>
  </v-data-table>



  </v-card>
</template>

<script>

import {usersRef} from '../main';


export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Campaign Management System',
      headers: [
        { text: 'บริษัท',sortable: true,align: 'center' }, 
        { text: 'ชื่อ-สกุล',sortable: true,align: 'center' },
        { text: 'Email',sortable: false,align: 'center' },
/*         { text: 'แก้ไข',sortable: false,align: 'center' }, */
        { text: 'ยกเลิกสิทธิ์',sortable: false,align: 'center' },
      ]
    }
  },
  firebase: {
    users:usersRef
  },
  methods: {
    submitCampaign(){
      // campainsRef.push({campaign_header: this.campaignHeader})  
    },
    setPage: function() {
        this.$store.dispatch("setPage","Users");
    },
    gotoAddUser() {
      this.$router.push({path: "adduser"})
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
