<template>
  <div class="shipping-history">
    <h2>Shipping History</h2>
    <div class="table-container" v-if="shipments.length">
      <table>
        <thead>
        <tr>
          <th>Package Number</th>
          <th>Sender</th>
          <th>Recipient</th>
          <th>Weight (kg)</th>
          <th>Cost ($)</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="shipment in shipments" :key="shipment.packageNumber">
          <td>{{ shipment.packageNumber }}</td>
          <td>{{ shipment.senderName }}</td>
          <td>{{ shipment.recipientName }}</td>
          <td>{{ shipment.weight }}</td>
          <td>{{ shipment.cost.toFixed(2) }}</td>
          <td>{{ new Date(shipment.date).toLocaleString() }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="no-shipments">No shipments found.</p>
    <button @click="goBack" class="back-button">Back to Menu</button>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {shippingService} from '@/services/shippingService'

export default {
  name: 'ShippingHistory',
  setup() {
    const router = useRouter()
    const shipments = ref([])

    onMounted(() => {
      shipments.value = shippingService.getShipments()
    })

    const goBack = () => {
      router.push('/main-menu')
    }

    return {
      shipments,
      goBack
    }
  }
}
</script>

<style scoped>
.shipping-history {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #3498db;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f8f8f8;
}

tr:hover {
  background-color: #e8f4f8;
}

.no-shipments {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
}

.back-button {
  display: block;
  width: 200px;
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2980b9;
}
</style>