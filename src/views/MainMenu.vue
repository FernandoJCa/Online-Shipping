<template>
  <div class="main-menu">
    <h2>Main Menu</h2>
    <div class="button-container">
      <button @click="sendPackage" class="menu-button">Send a Package</button>
      <button @click="viewHistory" class="menu-button">View Shipping History</button>
      <button @click="exitSystem" class="menu-button exit-button">Exit System</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'MainMenu',
  setup() {
    const router = useRouter()

    const sendPackage = () => {
      router.push('/shipping')
    }

    const viewHistory = () => {
      router.push('/history')
    }

    const exitSystem = () => {
      localStorage.removeItem('isLoggedIn')
      router.push('/')
    }

    return {
      sendPackage,
      viewHistory,
      exitSystem
    }
  }
}
</script>

<style scoped>
.main-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
}

h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.menu-button {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-button:hover {
  background-color: #2980b9;
}

.exit-button {
  background-color: #e74c3c;
}

.exit-button:hover {
  background-color: #c0392b;
}
</style>