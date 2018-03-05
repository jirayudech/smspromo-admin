<template>
<!--   <transition
    v-on:before-enter="setPage"
  > -->
  <v-card>
    <v-card-text class="text-lg-right">
      <!-- <label class="text-lg-right">Campaign Header:</label>
      <input type="text" v-model="campaignHeader"> -->
      <v-btn color="primary"  id="addButton" @click="submitCampaign()">
        <v-icon dark left>add_circle</v-icon> Add Client
      </v-btn>
    </v-card-text>

  <v-data-table
    v-bind:headers="headers"
    v-bind:items="campains"
    v-bind:search="search"
    v-model="selected"
    item-key="name"
    select-all
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
      <td>
        <v-checkbox
          primary
          hide-details
          v-model="props.selected"
        ></v-checkbox>
      </td>
      <td class="text-xs-left">{{ props.item.campaign_client }}</td>
      <td class="text-xs-left">

              <!-- <img src="{{ props.item.campaign_client_pic_url }}" alt="avatar"> -->
              <img :src="props.item.campaign_pic_url" height="50">

      </td>
      <td class="text-xs-left">{{ props.item.campaign_header }}</td>
      <td class="text-xs-center">
        <v-btn flat small color="warning">Edit</v-btn>
      </td>
      <td class="text-xs-center">
        <v-btn flat small color="error">Remove</v-btn>
      </td>
    </template>
  </v-data-table>



  </v-card>
</template>

<script>

//import {campainsRef} from '../main';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Campaign Management System',
      headers: [
        { text: 'Clients',sortable: true,align: 'center' },
        { text: 'Clients Picture',sortable: false,align: 'center' },
        { text: 'Clients Notes',sortable: true,align: 'center' },
        { text: 'Edit',sortable: false,align: 'center' },
        { text: 'Remove',sortable: false,align: 'center' },
      ]
    }
  },
  firebase: {
    campains:campainsRef
  },
  methods: {
    submitCampaign(){
      campainsRef.push({campaign_header: this.campaignHeader})  
    },
    setPage: function() {
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
