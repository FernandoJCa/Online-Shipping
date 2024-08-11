<template>
  <div class="shipping-form">
    <h2>Send a Package</h2>
    <form @submit.prevent="submitForm" v-if="!formSubmitted">
      <div class="form-group">
        <h3>Sender Details</h3>
        <label for="senderName">Name:</label>
        <input type="text" id="senderName" v-model="senderName">
        <div class="error" v-if="v$.senderName.$error">
          <span v-if="v$.senderName.required.$invalid">Name is required.</span>
          <span v-if="v$.senderName.minLength.$invalid">Name must be at least 3 characters long.</span>
        </div>

        <label for="senderAddress">Address:</label>
        <input type="text" id="senderAddress" v-model="senderAddress">
        <div class="error" v-if="v$.senderAddress.$error">
          <span v-if="v$.senderAddress.required.$invalid">Address is required.</span>
          <span v-if="v$.senderAddress.minLength.$invalid">Address must be at least 5 characters long.</span>
        </div>
      </div>

      <div class="form-group">
        <h3>Recipient Details</h3>
        <label for="recipientName">Name:</label>
        <input type="text" id="recipientName" v-model="recipientName">
        <div class="error" v-if="v$.recipientName.$error">
          <span v-if="v$.recipientName.required.$invalid">Name is required.</span>
          <span v-if="v$.recipientName.minLength.$invalid">Name must be at least 3 characters long.</span>
        </div>

        <label for="recipientAddress">Address:</label>
        <input type="text" id="recipientAddress" v-model="recipientAddress">
        <div class="error" v-if="v$.recipientAddress.$error">
          <span v-if="v$.recipientAddress.required.$invalid">Address is required.</span>
          <span v-if="v$.recipientAddress.minLength.$invalid">Address must be at least 5 characters long.</span>
        </div>
      </div>

      <div class="form-group">
        <h3>Package Details</h3>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" v-model="weight" step="0.1">
        <div class="error" v-if="v$.weight.$error">
          <span v-if="v$.weight.required.$invalid">Weight is required.</span>
          <span v-if="v$.weight.numeric.$invalid">Weight must be a number.</span>
          <span v-if="v$.weight.minValue.$invalid">Weight must be at least 0.1 kg.</span>
        </div>
      </div>

      <div class="button-group">
        <button type="submit" :disabled="v$.$invalid">Calculate Shipping</button>
        <button type="button" @click="returnToMainMenu" class="secondary-button">Back to Menu</button>
      </div>
    </form>

    <div v-if="formSubmitted" class="result">
      <h3>Shipping Details</h3>
      <p>Package Number: {{ packageNumber }}</p>
      <p>Shipping Cost: ${{ shippingCost.toFixed(2) }}</p>
      <div class="options">
        <h4>Would you like to perform another operation?</h4>
        <button @click="performAnotherOperation">Yes, send another package</button>
        <button @click="returnToMainMenu">No, return to main menu</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, numeric, minValue } from '@vuelidate/validators'
import { shippingService } from '@/services/shippingService'

export default {
  name: 'ShippingForm',
  setup() {
    const router = useRouter()
    const senderName = ref('')
    const senderAddress = ref('')
    const recipientName = ref('')
    const recipientAddress = ref('')
    const weight = ref(null)
    const shippingCost = ref(null)
    const packageNumber = ref(null)
    const formSubmitted = ref(false)

    const rules = computed(() => ({
      senderName: { required, minLength: minLength(3) },
      senderAddress: { required, minLength: minLength(5) },
      recipientName: { required, minLength: minLength(3) },
      recipientAddress: { required, minLength: minLength(5) },
      weight: { required, numeric, minValue: minValue(0.1) }
    }))

    const v$ = useVuelidate(rules, { senderName, senderAddress, recipientName, recipientAddress, weight })

    const submitForm = async () => {
      const result = await v$.value.$validate()
      if (result) {
        packageNumber.value = Math.floor(Math.random() * 1000000)
        shippingCost.value = weight.value * 2

        const shipment = {
          packageNumber: packageNumber.value,
          senderName: senderName.value,
          senderAddress: senderAddress.value,
          recipientName: recipientName.value,
          recipientAddress: recipientAddress.value,
          weight: weight.value,
          cost: shippingCost.value,
          date: new Date().toISOString()
        }
        shippingService.saveShipment(shipment)

        formSubmitted.value = true
      }
    }

    const performAnotherOperation = () => {
      senderName.value = ''
      senderAddress.value = ''
      recipientName.value = ''
      recipientAddress.value = ''
      weight.value = null
      shippingCost.value = null
      packageNumber.value = null
      formSubmitted.value = false
      v$.value.$reset()
    }

    const returnToMainMenu = () => {
      router.push('/main-menu')
    }

    return {
      senderName,
      senderAddress,
      recipientName,
      recipientAddress,
      weight,
      shippingCost,
      packageNumber,
      formSubmitted,
      submitForm,
      performAnotherOperation,
      returnToMainMenu,
      v$
    }
  }
}
</script>

<style scoped>
.shipping-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2, h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #34495e;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

.error {
  color: #e74c3c;
  font-size: 0.9em;
  margin-top: -5px;
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #2980b9;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background-color: #e8f6f3;
  border-radius: 4px;
}

.options {
  margin-top: 20px;
}

.options button {
  margin-top: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-group button {
  width: 48%; /* Adjust as needed */
}

.secondary-button {
  background-color: #95a5a6;
}

.secondary-button:hover {
  background-color: #7f8c8d;
}
</style>