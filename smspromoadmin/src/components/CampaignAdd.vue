<template>
  <v-card>
    <v-card >
      <v-container>
      <form @submit.prevent="submitCampaign">
        <v-flex>
          <v-select
            v-model="companyId"
            :items="companies"
            item-text="companyName"
            item-value="value"
            label="บริษัท"
            single-line
            required
          ></v-select>
        </v-flex>
        <v-flex>
          <v-select
            v-model="brandId"
            :items="brands"
            item-text="brandName"
            item-value="value"
            label="แบรนด์"
            single-line
          ></v-select>
        </v-flex>
        <v-text-field
          label="Header"
          v-model="campaignHeader"
          :counter="70"
          required
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="campaignDesc"
          :counter="10"
          required
        ></v-text-field>
<!--         <v-text-field
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
        ></v-text-field> -->
<!--         <v-text-field
          label="SMS Prefix"
          v-model="campaign_sms_prefix"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="SMS No"
          v-model="campaign_sms_no"
          :counter="10"
          required
        ></v-text-field> -->
<!--         <v-text-field
          label="SMS Price"
          v-model="smsPrice"
          :counter="10"
          required
        ></v-text-field> -->
      <v-card-text v-if="userIsAdmin" class="text-lg-right">
      <v-btn color="primary"  id="clearButton" >
         Clear Form
      </v-btn>
      <v-btn color="primary"  id="addButton" :disabled="!formIsValid" type="submit">
        Save Campaign
      </v-btn>
      </v-card-text>
      </form>

    
      </v-container>      
    </v-card>

  </v-card>
</template>

<script>
import {campaignsRef} from '../main';
import {companiesRef} from '../main';

export default {
    data () {
      return {
        companies: [],
        companiesArray: [],
        companyId: '',
        brands: [
          {"value":"Citi Bank", "brandName": "Citi Bank"},
          {"value":"Tanachart", "brandName": "Tanachart"},
          {"value":"Kokae", "brandName": "Kokae"},
        ],
        brandId: '',
        campaignHeader: '',
        campaignDesc: ''
      }
    },
    firebase: function(){
       var _this = this
       companiesRef.once("value").then(function(snap){
        var __this = _this
        snap.forEach(function(childSnapshot) {
            var key = childSnapshot.key; 
            var companyName = childSnapshot.child("companyName").val()
            __this.companies.push({"value": key,"companyName": companyName})
            __this.companiesArray[key] = companyName
        });
      })
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
        return this.companyId !== '' && this.campaignDesc !== '' && this.campaignHeader !== '' 
      }
      },
      methods: {
      submitCampaign: function() {
        let companyName = this.companiesArray[this.companyId]
        campaignsRef.push({campaign_header: this.campaignHeader,campaign_description: this.campaignDesc,campaign_company_id: this.companyId,campaign_company_name: companyName,campaign_client: this.brandId})
        this.$router.push('/')
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

