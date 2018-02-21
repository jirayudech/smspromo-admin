<template>
  <v-card>
    <v-card >
      <v-container> 
      <v-form v-model="valid">
        <v-text-field
          label="Campaign Client"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Campaign Header"
          v-model="name"
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
      </v-form>
            <v-card-text v-if="userIsAdmin" class="text-lg-right">
      <!-- <label class="text-lg-right">Campaign Header:</label>
      <input type="text" v-model="campaignHeader"> -->
      <v-btn color="primary"  id="addButton" @click="submitCampaign()">
        <v-icon dark left>add_circle</v-icon> Add Campaign
      </v-btn>
    </v-card-text>
      </v-container>      
    </v-card>

  </v-card>
</template>

<script>
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
      }
  }
}
</script>

