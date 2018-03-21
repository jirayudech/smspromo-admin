<template>
  <v-layout column>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h3>User</h3>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <form @submit.prevent="userSignUp">
        <v-layout column>
          <v-flex>
            <v-alert error dismissible v-model="alert">
              {{ error }}
            </v-alert>
          </v-flex>
          <v-flex>
            <v-text-field
              name="name"
              label="ชื่อ"
              id="name"
              type="text"
              v-model="name"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="surname"
              label="นามสกุล"
              id="surname"
              type="text"
              v-model="surname"
              required></v-text-field>
          </v-flex>
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
            <v-text-field
              name="email"
              label="Email สำหรับ Login"
              id="email"
              type="email"
              v-model="email"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="password"
              label="พาสเวิร์ด"
              id="password"
              type="password"
              v-model="password"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="confirmPassword"
              label="ยืนยันพาสเวิร์ด"
              id="confirmPassword"
              type="password"
              v-model="passwordConfirm"
              :rules="[comparePasswords]"
            ></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center" mt-5>
            <v-btn primary type="submit" :disabled="loading">Add User</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import {companiesRef} from '../main';

  export default {
    data () {
      return {
        name: '',
        surname: '',
        companies: [],
        companiesArray: [],
        companyId: '',
        email: '',
        password: '',
        passwordConfirm: '',
        alert: false
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
      comparePasswords () {
        return this.password === this.passwordConfirm ? true : 'พาสเวิร์ด และ ยืนยันพาสเวิร์ด ไม่ตรงกัน'
      },
      error () {
        return this.$store.getters.getError
      },
      loading () {
        return this.$store.getters.getLoading
      }
    },
    methods: {
      userSignUp () {
        if (this.comparePasswords !== true) {
          return
        }
      let companyName = this.companiesArray[this.companyId]

        this.$store.dispatch('userSignUp', {name: this.name, surname: this.surname,companyId: this.companyId, companyName: companyName,  email: this.email, password: this.password })
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