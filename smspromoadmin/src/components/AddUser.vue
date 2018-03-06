<template>
  <v-layout column>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h3>Add User</h3>
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
              label="Name"
              id="name"
              type="text"
              v-model="name"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="surname"
              label="Surname"
              id="surname"
              type="text"
              v-model="surname"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="telno"
              label="Telno"
              id="telno"
              type="text"
              v-model="telno"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-select
              :items="userTypeItems"
              v-model="userType"
              label="User Type"
              single-line
              bottom
            ></v-select>
          </v-flex>
          <v-flex>
            <v-text-field
              name="email"
              label="Email"
              id="email"
              type="email"
              v-model="email"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="password"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="confirmPassword"
              label="Confirm Password"
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
  export default {
    data () {
      return {
        name: '',
        surname: '',
        telno: '',
        userType: '',
        email: '',
        password: '',
        passwordConfirm: '',
        alert: false
      }
    },
    computed: {
      comparePasswords () {
        return this.password === this.passwordConfirm ? true : 'Password and confirm password don\'t match'
      },
      error () {
        return this.$store.getters.getError
      },
      loading () {
        return this.$store.getters.getLoading
      },
      userTypeItems  () {
        return  [
          {
            text: "Company",
            value : "company"
          },
          {
            text: "Admin",
            value: 'admin'
          }
        ]
      }
    },
    methods: {
      userSignUp () {
        if (this.comparePasswords !== true) {
          return
        }
        this.$store.dispatch('userSignUp', {name: this.name, surname: this.surname, telno: this.telno, userType: this.userType, email: this.email, password: this.password })
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