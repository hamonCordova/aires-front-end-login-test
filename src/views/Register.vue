<template>
  <div class="h-full flex">
    <div class="bg-login">
    </div>
    <div class="flex-1 flex justify-center items-start pt-40">
      <form
        class="login w-full flex flex-column justify-center w-430"
        @submit.prevent="login"
      >
        <div class="login__logo py-30 flex justify-center">
          <img src="/images/Grupo_12254.svg" alt="logo">
        </div>
        <div class="py-30">
          <h1 class="text-lg text-bold text-left">Crie sua conta</h1>
        </div>
        <div class="pb-30">
          <p class="text-left text-gray">Crie sua conta Aires</p>
        </div>
        <div class="pb-20 flex flex-column">
          <label for="user_email" class="pb-10">Email</label>
          <input
            id="user_email"
            type="email"
            name="email"
            placeholder="Email"
            v-model="user.email"
            required
            @input="validateEmail"
          >
          <p class="mt-5 text-red" style="font-size: 12px; height: 12px;">
            <span v-show="emailIsDirty && !emailValid">{{ emailError }}</span>
          </p>
        </div>
        <div class="pb-20 flex flex-column">
          <label for="user_password" class="pb-10">Senha</label>
          <input
            id="user_password"
            type="password"
            name="password"
            placeholder="Senha"
            v-model="user.password"
            required
            @input="validatePassword"
          >
          <p class="mt-5 text-red" style="font-size: 12px; height: 12px;">
            <span v-show="passwordIsDirty && !passwordValid">{{ passwordError }}</span>
          </p>
        </div>
        <div class="pb-20 flex flex-column">
          <label for="user_password" class="pb-10">Confirme sua senha </label>
          <input
            id="user_password"
            type="password"
            name="password"
            placeholder="Senha"
            v-model="user.passwordRepeat"
            required
            @input="validatePasswordRepeat"
          >
          <p class="mt-5 text-red" style="font-size: 12px; height: 12px;">
            <span v-show="passwordRepeatIsDirty && !passwordRepeatValid">{{ passwordRepeatError }}</span>
          </p>
        </div>
        <div class="pb-40">
          <button :disabled="!isValid" type="submit" name="button" class="w-full">Cria conta</button>
        </div>
        <div class="pb-40 flex justify-center">
          <p>Já possui conta? <router-link class="text-blue" to="/login">Clique aqui para acessar</router-link></p>
        </div>
        <div class="flex justify-center">
          <a class="text-blue">Esqueceu sua senha?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        user: {
          email: '',
          password: '',
          passwordRepeat: ''
        },
        emailValid: false,
        passwordValid: false,
        passwordRepeatValid: false,
        emailIsDirty: false,
        passwordIsDirty: false,
        passwordRepeatIsDirty: false,
        emailError: '',
        passwordError: '',
        passwordRepeatError: ''
      }
    },
    computed: {
      isValid () {
        return this.emailValid && this.passwordValid && this.passwordRepeatValid
      }
    },
    methods: {
      validateEmail () {
        const email = this.user.email

        if (!this.emailIsDirty)
          this.emailIsDirty = true

        if (!email) {
          this.emailValid = false
          this.emailError = 'Informe um e-email'
          return
        }

        if (!this.$utils.validateEmail(email)) {
          this.emailValid = false
          this.emailError = 'E-mail inválido'
          return
        }

        this.emailValid = true
      },
      validatePassword () {
        const password = this.user.password

        if (!this.passwordIsDirty)
          this.passwordIsDirty = true

        if (!password) {
          this.passwordValid = false
          this.passwordError = 'Informe uma senha'
          return
        }

        this.passwordValid = true
      },
      validatePasswordRepeat () {
        const passwordRepeat = this.user.passwordRepeat,
              password       = this.user.password

        if (!this.passwordRepeatIsDirty)
          this.passwordRepeatIsDirty = true

        if (!passwordRepeat) {
          this.passwordRepeatValid = false
          this.passwordRepeatError = 'Informe uma senha'
          return
        }

        if (password !== passwordRepeat) {
          this.passwordRepeatValid = false
          this.passwordRepeatError = 'As senhas não conferem'
          return
        }

        this.passwordRepeatValid = true
      },
      login () {
        console.log(this.isValid)
        if (this.isValid) {
          localStorage.setItem('user', JSON.stringify({
            email: this.user.email
          }))

          window.location.reload()
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .bg-login {
    background: transparent;
    background-image: url('/images/Grupo 12043.png');
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: padding-box;
    width: 60%;
  }

  .login {
    &__logo {

    }
  }
</style>
