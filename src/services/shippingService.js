export const shippingService = {
    saveShipment(shipment) {
        const shipments = this.getShipments()
        shipments.push(shipment)
        localStorage.setItem('shipments', JSON.stringify(shipments))
    },

    getShipments() {
        const shipments = localStorage.getItem('shipments')
        return shipments ? JSON.parse(shipments) : []
    }
}