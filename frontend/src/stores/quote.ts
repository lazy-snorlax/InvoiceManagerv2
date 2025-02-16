import { create } from "zustand";
import quotes from '../data/quotes.json'

type Quote = {
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

interface QuoteState {
    records: [],
    currentRecord: Quote | null,
    loading: boolean,
    error: string | null,
    
    // Actions
    fetchRecords: () => void
    fetchLatestRecord: () => void
    setCurrentRecord: (quote: Quote) => void
    next: () => void
    previous: () => void
    first: () => void
    last: () => void
    save: () => void

    // Actions for TransHead
    addNewTransactionHead: (trans: {}) => void
    updateTransactionHead: (trans: {}) => void
    removeTransactionHead: (trans: {}) => void

    // TODO: Actions for TransLines
    addNewTransactionLine: (trans: {}) => void
    updateTransactionLine: (trans: {}) => void
    removeTransactionLine: (trans: {}) => void
}

export const useQuoteStore = create<QuoteState>()((set) => ({
    records: [],
    currentRecord: null,
    loading: false,
    error: null,

    fetchRecords: async () => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}quote-list`)
            const data = await response.json()
            console.log(">>> records Quote", data)
            set({ loading: false, records: data })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
        }
    },

    fetchLatestRecord: async () => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}quotes`);
            const data = await response.json();
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    },

    setCurrentRecord: (quote) => set({ currentRecord: quote }),
    next: () => set(async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const nextIndex = (currentIndex + 1) % state.records.length;

            const response = await fetch(`${import.meta.env.VITE_API_URL}quotes/${state.records[nextIndex].id}`);
            const data = await response.json();
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    previous: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const prevIndex = (currentIndex - 1 + state.records.length) % state.records.length;

            const response = await fetch(`${import.meta.env.VITE_API_URL}quotes/${state.records[prevIndex].id}`);
            const data = await response.json();
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    first: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}quotes/${state.records[0].id}`);
            const data = await response.json();
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    last: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}quotes/${state.records[state.records.length-1].id}`);
            const data = await response.json();
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),

    save: () => set((state) => {
        // set({ currentRecord: invoice })
        console.log(">>> save: Quote currentRecord", state.currentRecord)
        return { currentRecord: state.currentRecord }
    }),

    /** -- Transaction Head ----------------------- */
    // TODO: api call to enter new TransHeader into db
    addNewTransactionHead: (trans) => set((state) => {
        return { currentRecord: { ...state.currentRecord, transactions: trans, } }
    }),
    
    // TODO: api call to update TransHead directly and return result?
    updateTransactionHead: (trans) => set((state) => ({
         currentRecord: {
            ...state.currentRecord,
            transactions: state.currentRecord?.transactions.map((item) => 
                item.titleNo === trans.titleNo ? { ...item, ...trans } : item
            ),
        },
    })),

    // TODO: api call to remove TransHead and return new currentRecord?
    removeTransactionHead: (trans) => set((state) => ({
        currentRecord: {
            ...state.currentRecord,
            transactions: state.currentRecord?.transactions.filter((item) => 
                item.titleNo !== trans.titleNo)
        }
    })),


    /** -- Transaction Lines ----------------------- */
    addNewTransactionLine: (line) => set((state) => {
        const trans = state.currentRecord?.transactions.map((item) => {
            if (item.titleNo === line.titleNo) {
                return { ...item, lines: [ ...item.lines, line] }
            }
            return item
        });
        return { currentRecord: {...state.currentRecord, transactions: trans,} }
    }),

    updateTransactionLine: (updatedLine) => set((state) => {
        const trans = state.currentRecord?.transactions.map((item) => {
            if (item.titleNo === updatedLine.titleNo) {
                const lines = item.lines.map((line) => {
                    if (line.item === updatedLine.item) {
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
            if (item.titleNo === removedLine.titleNo){
                const lines = item.lines.filter((line) => line.item !== removedLine.item)
                return { ...item, lines}
            }
            return item
        })
        return { currentRecord: {...state.currentRecord, transactions: trans,} }
    })
}))