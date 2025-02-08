import { create } from "zustand";
import { devtools } from "zustand/middleware";
import invoices from '../data/invoices.json'

type Invoice = {
    id: number| null
    company: string | null
    credittype: string | null
    date: string | null
    note: string | null
    paid: string | null
    paymentdetail: string | null
    type: string | null
    transactions: []
}

interface InvoiceState {
    records: Invoice[],
    currentRecord: Invoice | null,
    loading: boolean,
    error: string | null,
    
    // Actions
    fetchRecords: () => void
    setCurrentRecord: (invoice: Invoice) => void
    next: () => void
    previous: () => void
    save: (invoice: Invoice) => void

    addNewTransactionHead: (trans: {}) => void
    updateTransaction: (trans: {}) => void
}

export const useInvoiceStore = create<InvoiceState>()(devtools((set) => ({
    records: [],
    currentRecord: null,
    loading: false,
    error: null,

    fetchRecords: () => {
        const data: Invoice[] = invoices
        set({ records: data, currentRecord: invoices[0] || null})
    },

    // fetchRecords: async () => {
    //     set({ loading: true, error: null })
    //     try {
    //         const response = await fetch(`/api/invoices`);
    //         const data: Invoice[] = await response.json();
    //         set({ records: data, loading: false, currentRecord: data[0] || null });
    //     } catch (error) {
    //         set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
    //     }
    // },

    setCurrentRecord: (invoice) => set({ currentRecord: invoice }),
    next: () => set((state) => {
        const currentIndex = state.records.indexOf(state.currentRecord!);
        const nextIndex = (currentIndex + 1) % state.records.length;
        return { currentRecord: state.records[nextIndex] };
    }),
    previous: () => set((state) => {
        const currentIndex = state.records.indexOf(state.currentRecord!);
        const prevIndex = (currentIndex - 1 + state.records.length) % state.records.length;
        return { currentRecord: state.records[prevIndex] };
    }),
    save: (invoice) => set((state) => {
        console.log(">>> currentState: ", state.currentRecord, invoice)
        return { currentRecord: invoice }
    }),

    // TODO: api call to enter new TransHeader into db
    addNewTransactionHead: (trans) => set((state) => {
        return { currentRecord: { ...state.currentRecord, transactions: trans, } }
    }),
    
    updateTransaction: (trans) => set((state) => {
        console.log(">>> updateTrans: ", trans)
    })
})))