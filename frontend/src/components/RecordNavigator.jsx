import React, { useState, useEffect } from 'react';

const RecordNavigator = ({data, RenderComponent}) => {
    const [record, setRecord] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(data.length-1);
    const [loading, setLoading] = useState(false);

    const fetchRecord = async (index) => {
        setLoading(true);
        try {
            // TODO: Replace this with your API URL and adjust the response structure accordingly
            // const response = await fetch(`${props.api}/${index}`);
            // const data = await response.json();
            const formData = data[currentIndex]
            console.log(">>> data: ", formData, currentIndex)
            setRecord(formData);
        } catch (error) {
            console.error("Error fetching record:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecord(currentIndex);
        console.log(">>> currentIndex: ", currentIndex)
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length)); // Prevent going over array length
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Prevent going below 0
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!record) {
        return (
            <>
                <div className="min-h-full flex flex-col">
                    <div className="flex-grow">
                        <h1>No records found</h1>
                    </div>
                </div>
                <div className="sticky bottom-0 bg-gray-800 text-white p-2">
                    <button className='btn btn-ghost' onClick={handlePrevious} disabled={currentIndex === 0}>&#11164;</button>
                    <button className='btn btn-ghost' onClick={handleNext}>&#10148;</button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-full flex flex-col">
                <div className="flex-grow">
                    <RenderComponent record={record} key={currentIndex} />
                </div>
            </div>
            <div className="sticky bottom-0 bg-gray-800 text-white p-2">
                <button className='btn btn-ghost' onClick={handlePrevious} disabled={currentIndex === 0}>&#11164;</button>
                <span>{`${currentIndex + 1} of ${data.length-1}`}</span>
                <button className='btn btn-ghost' onClick={handleNext} disabled={currentIndex === data.length-1}>&#10148;</button>
            </div>
        </>
    );
};

export default RecordNavigator;
