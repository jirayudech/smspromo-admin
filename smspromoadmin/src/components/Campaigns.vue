<template>
  <div class="body">
    <h1>{{ msg }}</h1>
    <h2>Add Campaign</h2>
    <label>Campaign Header:</label>
    <input type="text" v-model="campaignHeader">
    <br>
    <button id="addButton" @click="submitCampaign()">Add Campain</button>
    <br><br>


    <h2>Campaigns</h2>
    <ul>
      <li v-for="campaign of campains" v-bind:key="campaign['.key']">{{campaign.th.campaignHeader}}</li>
    </ul>
  </div>
</template>

<script>

import {campainsRef} from '../main';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Campaign Management System'
    }
  },
  firebase: {
    campains:campainsRef
  },
  methods: {
    submitCampaign(){
      campainsRef.push({th:{campaignHeader: this.campaignHeader}})  
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
