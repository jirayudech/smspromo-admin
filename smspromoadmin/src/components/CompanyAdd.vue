<template>
  <v-layout column>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h3>Company</h3>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <form @submit.prevent="CompanyAdd">
        <v-layout column>
          <v-flex>
            <v-alert error dismissible v-model="alert">
              {{ error }}
            </v-alert>
          </v-flex>
          <v-flex>
            <v-text-field
              name="companyName"
              label="ชื่อบริษัท"
              id="companyName"
              type="text"
              v-model="companyName"
              required></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center" mt-5>
            <v-btn primary type="submit" :disabled="loading">Add Company</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import router from '@/router'
import {companiesRef} from '../main';

  export default {
    data () {
      return {
        companyName: '',
        companyId: '',
        alert: false
      }
    },
    firebase: function(){
        return {companies: companiesRef}
     },    
    computed: {
      error () {
        return this.$store.getters.getError
      },
      loading () {
        return this.$store.getters.getLoading
      }
    },
    methods: {
      CompanyAdd () {
        companiesRef.push({companyName: this.companyName}).then(data =>{
          router.push('/companies')
        })
        .catch(error => {
          this.$store.dispatch('setError', error.message)
        })
      }
    },
    watch: {
      error (value) {
        if (value) {
          this.alert = true
        }
      },
      alert (value) {
        if (!value) {
          this.$store.dispatch('setError', null)
        }
      }
    }
  }
</script>