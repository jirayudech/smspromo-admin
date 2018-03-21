<template>
  <v-card>
    <v-card >
      <v-container>
      <div>Mode: {{$route.params.mode}}</div> 
      <form @submit.prevent="submitCampaign" v-for="c in campaign">
      <!-- <v-form v-model="valid" > -->
        <v-text-field
          label="Company"
          v-model="c.campaign_company"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Brand"
          v-model="c.campaign_brand"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Header"
          v-model="c.campaign_header"
          :counter="70"
          required
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="c.campaign_desc"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Picture"
          v-model="campaignPictureUrl"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Category"
          v-model="c.campaign_category"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Start Date"
          v-model="campaignStartDate"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="End Date"
          v-model="campaignEndDate"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="SMS Prefix"
          v-model="c.campaign_sms_prefix"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="SMS No"
          v-model="c.campaign_sms_no"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="SMS Price"
          v-model="smsPrice"
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
    firebase(){
      return {campaign: campaignsRef.orderByKey().startAt(this.$route.params.id).endAt(this.$route.params.id)} 
    },
    computed: {
      isAuthenticated() {
        return (
          this.$store.getters.getUser !== null &&
          this.$store.getters.getUser !== undefined
        )
      },
      userIsAdmin() {
        return (
          this.$store.getters.getUser.userType == 'admin' && this.$store.getters.getUser !== null 
        );
      },
      formIsValid () {
        return this.campaignClient !== '' && this.campaignHeader !== '' 
      }
      },
      methods: {
      submitCampaign: function() {
        campainsRef.push({campaign_header: this.campaignHeader})  
      },
      setPage() {
        this.$store.dispatch("setPage","Campaign");
      },
      nameRules() {
        return null;
      }
    }
  }
</script>

