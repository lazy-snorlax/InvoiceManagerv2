import React, { useState, useEffect } from 'react';

type RecordNavigatorProps<TState, TActions> = {
    state: TState; // The state from the store
    actions: TActions; // The actions from the store
};

const RecordNavigator = <TState, TActions>({
    state,
    actions,
  }: RecordNavigatorProps<TState, TActions>) => {

    const { invoices, currentInvoice, loading, error } = state;
    const { next, previous } = actions;

    console.log(">>>> current: ", currentInvoice)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (currentInvoice == null) {
        return (
            <>
                <div className="min-h-full flex flex-col">
                    <div className="flex-grow">
                        <h1>No records found</h1>
                    </div>
                </div>
                <div className="sticky bottom-0 bg-gray-800 text-white p-2">
                    <button className='btn btn-ghost' onClick={previous}>&#11164;</button>
                    <button className='btn btn-ghost' onClick={next}>&#10148;</button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-full flex flex-col">
                <div className="flex-grow">
                    {/* <RenderComponent record={currentRecord} key={currentRecord.id} /> */}
                    <pre key={currentInvoice.id}>{currentInvoice.company}</pre>
                </div>
            </div>
            <div className="sticky bottom-0 bg-gray-800 text-white p-2">
                <button className='btn btn-ghost' onClick={previous}>&#11164;</button>
                {/* <span>{`${currentIndex + 1} of ${data.length-1}`}</span> */}
                <button className='btn btn-ghost' onClick={next}>&#10148;</button>
            </div>
        </>
    );
};

export default RecordNavigator;
