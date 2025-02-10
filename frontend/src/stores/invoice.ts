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

export const useInvoiceStore = create<InvoiceState>()(devtools((set) => ({
    records: [],
    currentRecord: null,
    loading: false,
    error: null,

    fetchRecords: () => {
        const data: Invoice[] = invoices
        set({ records: data, currentRecord: invoices[0] || null})
    },

    // TODO: api call
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
    save: () => set((state) => {
        // set({ currentRecord: invoice })
        console.log(">>> save: currentRecord", state.currentRecord)
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
})))