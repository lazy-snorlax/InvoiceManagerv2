import { create } from "zustand";
import { devtools } from "zustand/middleware";
import http from "../utilities/http";
import { toast } from 'react-toastify'

type Invoice = {
    id: number| null
    company: string | null
    credittype: string | null
    date_issued: string | null
    note: string | null
    paid: string | null
    paymentdetail: string | null
    type: string | null
    transactions: []
}

interface InvoiceState {
    records: [],
    currentRecord: Invoice | null,
    loading: boolean,
    error: string | null,
    
    // Actions
    fetchRecords: () => void
    fetchLatestRecord: () => void
    setCurrentRecord: (invoice: Invoice) => void
    next: () => void
    previous: () => void
    first: () => void
    last: () => void
    save: () => void
    newRecord: () => void

    // Actions for TransHead
    addNewTransactionHead: (trans: {}) => void
    updateTransactionHead: (trans: {}) => void
    removeTransactionHead: (trans: {}) => void

    // Actions for TransLines
    addNewTransactionLine: (trans: {}) => void
    updateTransactionLine: (trans: {}) => void
    removeTransactionLine: (trans: {}) => void

    downloadPdf: () => void
    downloadCSV: (range: String|null, start: String| null, end: String|null) => void
}

export const useInvoiceStore = create<InvoiceState>()(devtools((set) => ({
    records: [],
    currentRecord: null,
    loading: false,
    error: null,

    // fetch array of invoice ids, use them to navigate records
    fetchRecords: async () => {
        set({ loading: true, error: null })
        try {
            const response = await http.get('invoice-list')
            const data = await response.data
            set({ loading: false, records: data })
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    },

    fetchLatestRecord: async () => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`invoices`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    },

    setCurrentRecord: (invoice) => set({ currentRecord: invoice }),
    next: () => set( async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const nextIndex = (currentIndex + 1) % state.records.length;

            const response = await http.get(`invoices/${state.records[nextIndex].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    }),
    previous:  () => set(async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const prevIndex = (currentIndex - 1 + state.records.length) % state.records.length;

            const response = await http.get(`invoices/${state.records[prevIndex].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    }),
    first: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`invoices/${state.records[0].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    }),
    last: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`invoices/${state.records[state.records.length-1].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    }),
    save: () => set(async (state) => {
        if (state.currentRecord?.id == null) {
            try {
                const response = await http.post(`invoices`, state.currentRecord)
                const records = [...state.records, {id: response.data.data.id}]
                set({ loading: false,currentRecord: response.data.data, records: records })
                toast.success("Saved Successfully")
            } catch (error) {
                // set({ error: error instanceof Error ? error.message: "Unknown error" })
                toast.error("Oops, something went wrong! Error: " + error.message)
            }
        } else {
            try {
                const response = await http.put(`invoices/${state.currentRecord.id}`, state.currentRecord)
                const data = response.data
                set({ currentRecord: data.data })
                toast.success("Saved Successfully")
            } catch (error) {
                // set({ error: error instanceof Error ? error.message: "Unknown error" })
                toast.error("Oops, something went wrong! Error: " + error.message)
            }
        }
        return { currentRecord: state.currentRecord }
    }),
    newRecord: () => {        
        try {
            const newRecord: Invoice = {
                id: null,
                company: null,
                credittype: null,
                created_at: null,
                note: null,
                paid: null,
                type: null,
                paymentdetail: null,
                transactions: []
            }
            set({ currentRecord: newRecord, error: null })
        } catch (error) {
            // set({ error: error instanceof Error ? error.message: "Unknown error" })
            toast.error("Oops, something went wrong! Error: " + error.message)
        }
    },

    /** -- Transaction Head ----------------------- */
    addNewTransactionHead: (trans) => set((state) => {
        return { currentRecord: { ...state.currentRecord, transactions: trans, } }
    }),
    
    updateTransactionHead: (updatedTrans) => set((state) => {
        const trans = state.currentRecord?.transactions.map((item) => {
            if (item.id === updatedTrans.id) {
                return { ...item, ...updatedTrans }
            }
            return item
        })
        return { currentRecord: {...state.currentRecord, transactions: trans,} }
    }),

    removeTransactionHead: (removeTrans) => set((state) => {
        const trans = state.currentRecord?.transactions.filter((item) => item.id !== removeTrans.id)
        return { currentRecord: {...state.currentRecord, transactions: trans} }
    }),

    /** -- Transaction Lines ----------------------- */
    addNewTransactionLine: (line) => set((state) => {
        const trans = state.currentRecord?.transactions.map((item) => {
            if (item.id == line.titleNo) {
                return { ...item, lines: [ ...item.lines, line] }
            }
            return item
        });
        return { currentRecord: {...state.currentRecord, transactions: trans,} }
    }),

    updateTransactionLine: (updatedLine) => set((state) => {
        const trans = state.currentRecord?.transactions.map((item) => {
            if (item.id == updatedLine.titleNo || item.titleNo == updatedLine.titleNo) {
                const lines = item.lines.map((line) => {
                    if (line.item == updatedLine.item) {
                        return updatedLine
                    }
                    return line
                })
                return { ...item, lines}
            }
            return item
        })
        return { currentRecord: {...state.currentRecord, transactions: trans,} }
    }),

    removeTransactionLine: (removedLine) => set((state) => {
        const trans = state.currentRecord?.transactions.map((item) => {
            if (item.id == removedLine.titleNo){
                const lines = item.lines.filter((line) => line.item !== removedLine.item)
                return { ...item, lines}
            }
            return item
        })
        return { currentRecord: {...state.currentRecord, transactions: trans,} }
    }),

    downloadPdf: () => set(async (state) => {
        await http.get(`invoice-pdf/${state.currentRecord.id}`, {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' },
            params: { 'type': 'pdf' }
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
            window.open(url, '_blank')
        })
        .catch(error => {
            toast.error("Oops, something went wrong! Error: " + error.message)
        })
    }),

    downloadCSV: (range, start=null, end=null) => set(async (state) => {
        const params = {
            "type": "csv",
            "q" : range,
            "start": start,
            "end": end,
        }
        await http.get(`invoice-report?q=${range}`, {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' },
            params
        }).then(response => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([response.data]))
            link.download = 'Sales Report.csv'
            link.click()
        })
        .catch(error => {
            // console.log(">>> CSV Report Error: ", error)
            toast.error("Oops, something went wrong! Error: " + error.message)
        })
    })
})))