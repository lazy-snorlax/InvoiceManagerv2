import { create } from "zustand";
import { devtools } from "zustand/middleware";
import http from "../utilities/http";

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
    newRecord: () => void

    // Actions for TransHead
    addNewTransactionHead: (trans: {}) => void
    updateTransactionHead: (trans: {}) => void
    removeTransactionHead: (trans: {}) => void

    // TODO: Actions for TransLines
    addNewTransactionLine: (trans: {}) => void
    updateTransactionLine: (trans: {}) => void
    removeTransactionLine: (trans: {}) => void

    downloadPdf: () => void
}

export const useQuoteStore = create<QuoteState>()(devtools((set) => ({
    records: [],
    currentRecord: null,
    loading: false,
    error: null,

    fetchRecords: async () => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`quote-list`)
            const data = await response.data
            set({ loading: false, records: data })
        } catch (error) {
            // set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
        }
    },

    fetchLatestRecord: async () => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`quotes`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            // set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    },

    setCurrentRecord: (quote) => set({ currentRecord: quote }),
    next: () => set(async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const nextIndex = (currentIndex + 1) % state.records.length;

            const response = await http.get(`quotes/${state.records[nextIndex].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            // set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    previous: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const currentIndex = state.records.findIndex((record) => record.id == state.currentRecord?.id);
            const prevIndex = (currentIndex - 1 + state.records.length) % state.records.length;

            const response = await http.get(`quotes/${state.records[prevIndex].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            // set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    first: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`quotes/${state.records[0].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            // set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),
    last: ()=> set(async (state) => {
        set({ loading: true, error: null })
        try {
            const response = await http.get(`quotes/${state.records[state.records.length-1].id}`);
            const data = await response.data;
            set({ loading: false, currentRecord: data.data || null });
        } catch (error) {
            // set({ error: error instanceof Error ? error.message : "Unknown error", loading: false})
        }
    }),

    save: () => set(async (state) => {
        if (state.currentRecord?.id == null) {
            try {
                const response = await http.post(`quotes`, state.currentRecord)
                const records = [...state.records, {id: response.data.data.id}]
                set({ loading: false,currentRecord: response.data.data, records: records })
            } catch (error) {
                // set({ error: error instanceof Error ? error.message: "Unknown error" })
            }
        } else {
            try {
                const response = await http.put(`quotes/${state.currentRecord.id}`, state.currentRecord)
                const data = response.data
                set({ currentRecord: data.data })
            } catch (error) {
                // set({ error: error instanceof Error ? error.message: "Unknown error" })
            }
        }
        return { currentRecord: state.currentRecord }
    }),
    newRecord: () => {
        try {
            const newRecord: Quote = {
                id: null,
                company: null,
                credittype: null,
                date: null,
                note: null,
                paid: null,
                paymentdetail: null,
                type: null,
                transactions: []
            }
            set({ currentRecord: newRecord, error:null })
        } catch (error) {
            // set({ error: error instanceof Error ? error.message: "Unknown error" })
        }
    },

    /** -- Transaction Head ----------------------- */
    // TODO: api call to enter new TransHeader into db
    addNewTransactionHead: (trans) => set((state) => {
        return { currentRecord: { ...state.currentRecord, transactions: trans, } }
    }),
    
    // TODO: api call to update TransHead directly and return result?
    updateTransactionHead: (updatedTrans) => set((state) => {
        const trans = state.currentRecord?.transactions.map((item) => {
            if (item.id === updatedTrans.id) {
                return { ...item, ...updatedTrans }
            }
            return item
        })
        return { currentRecord: {...state.currentRecord, transactions: trans,} }
    }),

    // TODO: api call to remove TransHead and return new currentRecord?
    removeTransactionHead: (removeTrans) => set((state) => {
        const trans = state.currentRecord?.transactions.filter((item) => item.id !== removeTrans.id)
        return { currentRecord: {...state.currentRecord, transactions: trans} }
    }),


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
            if (item.titleNo == updatedLine.titleNo || item.titleNo == updatedLine.titleNo) {
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
    }),

    downloadPdf: () => set(async (state) => {
        await http.get(`quote-pdf/${state.currentRecord.id}`, {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' },
            params: { 'type': 'pdf' }
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            window.open(url, '_blank')
        })
    })
})))