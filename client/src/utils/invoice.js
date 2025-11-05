import { api } from "../api/axios.js"

export const handleGenerateInvoice = async (customerName, cartItems) => {

    try {
        const response = await api.post('/invoice', { customerName, cartItems },
            { responseType: 'blob' }
        )

        const blob = new Blob([response.data], { type: "application/pdf" })
        const url = window.URL.createObjectURL(blob)

        window.open(url, "_blank")

        setTimeout(() => { window.URL.revokeObjectURL(url) }, 5000);

    } catch (error) {
        console.error(error)
    }


}