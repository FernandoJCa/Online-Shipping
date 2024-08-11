<template>
  <div class="home">
    <Login v-if="!isLoggedIn" @login-success="onLoginSuccess" />
    <MainMenu v-else />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Login from '@/components/Login.vue'
import MainMenu from '@/views/MainMenu.vue'

export default {
  name: 'Home',
  components: {
    Login,
    MainMenu
  },
  setup() {
    const isLoggedIn = ref(false)
    const router = useRouter()

    const onLoginSuccess = () => {
      isLoggedIn.value = true
      router.push('/main-menu')
    }

    return {
      isLoggedIn,
      onLoginSuccess
    }
  }
}
</script>