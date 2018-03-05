<template>
  <v-card>
    <v-card >
      <v-container> 
      <form @submit.prevent="submitCampaign">
      <!-- <v-form v-model="valid" > -->
        <v-text-field
          label="Campaign Client"
          v-model="campaignClient"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Campaign Header"
          v-model="campaignHeader"
          :rules="nameRules"
          :counter="70"
          required
        ></v-text-field>
        <v-text-field
          label="Campaign Description"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Campaign Category"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="SMS Prefix"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="SMS Price"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
      </form>
      <v-card-text v-if="userIsAdmin" class="text-lg-right">
      <v-btn color="primary"  id="addButton" >
         Cancel
      </v-btn>
      <v-btn color="primary"  id="addButton" :disabled="!formIsValid" type="submit">
        Save Campaign
      </v-btn>
    </v-card-text>
      </v-container>      
    </v-card>

  </v-card>
</template>

<script>
import {campaignsRef} from '../main';

export default {
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
      },
      formIsValid () {
        return this.campaignClient !== '' && this.campaignHeader !== '' 
      },
      methods: {
      submitCampaign: function() {
        alert(this.campaign_header)
        campainsRef.push({campaign_header: this.campaignHeader})  
      },
      setPage() {
        this.$store.dispatch("setPage","Campaign");
      }
    }
  }
}
</script>

