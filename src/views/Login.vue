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
          <h1 class="text-lg text-bold text-left">Acesso via e-mail</h1>
        </div>
        <div class="pb-30">
          <p class="text-left text-gray">Acesse sua conta Aires por algum método abaixo</p>
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
        <div class="pb-20 flex justify-between">
          <div class="flex items-center">
            <input type="checkbox" name="" value="">
            <label class="ml-10" for="user_password">Continuar conectado</label>
          </div>
          <div class="">
            <a class="text-blue">Esqueceu sua senha?</a>
          </div>
        </div>
        <div class="pb-40">
          <button :disabled="!isValid" type="submit" name="button" class="w-full">Acessar</button>
        </div>
        <div class="">
          <p>Não possui uma conta? <router-link to="/register" class="text-blue">Clique para criar sua conta</router-link></p>
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
          password: ''
        },
        emailValid: false,
        passwordValid: false,
        emailIsDirty: false,
        passwordIsDirty: false,
        emailError: '',
        passwordError: ''
      }
    },
    computed: {
      isValid () {
        return this.emailValid && this.passwordValid
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
