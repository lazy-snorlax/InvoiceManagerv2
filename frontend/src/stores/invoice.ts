import { create } from "zustand";
import { devtools } from "zustand/middleware";
import http from "../utilities/http";

type Invoice = {
    id: number| null
    company: string | null
    credittype: string | null
    created_at: string | null
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

    // TODO: Actions for TransLines
    addNewTransactionLine: (trans: {}) => void
    updateTransactionLine: (trans: {}) => void
    removeTransactionLine: (trans: {}) => void

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
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
        }
    },

    // TODO: api call
    fetchLatestRecord: async () => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`invoices`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
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
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
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
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    first: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`invoices/${state.records[0].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    last: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`invoices/${state.records[state.records.length-1].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    save: () => set(async (state) => {
        if (state.currentRecord?.id == null) {
            try {
                const response = await http.post(`invoices`, state.currentRecord)
                const records = [...state.records, {id: response.data.data.id}]
                set({ loading: false,currentRecord: response.data.data, records: records })
            } catch (error) {
                set({ error: error instanceof Error ? error.message: "Unknown error" })
            }
        } else {
            try {
                const response = await http.put(`invoices/${state.currentRecord.id}`, state.currentRecord)
                const data = response.data
                set({ currentRecord: data.data })
            } catch (error) {
                set({ error: error instanceof Error ? error.message: "Unknown error" })
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
            set({ error: error instanceof Error ? error.message: "Unknown error" })
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
    })
})))