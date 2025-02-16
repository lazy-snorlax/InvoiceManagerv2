import React, { useState, useEffect } from 'react';

type RecordNavigatorProps<TState, TActions, ReactElement> = {
    state: TState; // The state from the store
    actions: TActions; // The actions from the store
    RenderComponent: ReactElement
};

const RecordNavigator = <TState, TActions, ReactElement>({
    state,
    actions,
    RenderComponent
  }: RecordNavigatorProps<TState, TActions, ReactElement>) => {

    const { records, currentRecord, loading, error } = state;
    const { next, previous, first, last } = actions;

    const currentIndex = records.findIndex((record) => record.id == state.currentRecord?.id);

    if (loading) { return <div>Loading...</div> }

    if (error) { return <div>Error: {error}</div> }

    if (currentRecord == null) {
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
                    <RenderComponent record={currentRecord} key={currentRecord.id} />
                </div>
            </div>
            <div className="sticky bottom-0 bg-gray-800 text-white p-2">
                <button className='btn btn-ghost' onClick={first} >|&#11164;</button>
                <button className='btn btn-ghost' onClick={previous}>&#11164;</button>
                <span>{`${currentIndex+1} of ${records.length}`}</span>
                <button className='btn btn-ghost' onClick={next}>&#10148;</button>
                <button className='btn btn-ghost' onClick={last}>&#10148;|</button>
            </div>
        </>
    );
};

export default RecordNavigator;
