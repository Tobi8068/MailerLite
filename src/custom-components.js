import React, { useState, useCallback, useRef, useEffect } from 'react';

export const Switch = ({ checked, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked)

    const handleClick = () => {
        setIsChecked(!isChecked)
        onChange(!isChecked)
    }

    return (
        <div
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${isChecked ? 'bg-purple-600' : 'bg-gray-300'
                }`}
            onClick={handleClick}
        >
            <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isChecked ? 'translate-x-6' : 'translate-x-0'
                    }`}
            ></div>
        </div>
    )
}

export const Slider = ({ min, max, value, onChange }) => {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = useCallback((event) => {
        setIsDragging(true);
        event.preventDefault(); // Prevent default action
    }, []);

    const handleMouseUp = useCallback((event) => {
        setIsDragging(false);
        event.preventDefault(); // Prevent default action
    }, []);

    const handleMove = useCallback(
        (event) => {
            if (isDragging && sliderRef.current) {
                // Prevent text selection
                event.preventDefault();

                const sliderRect = sliderRef.current.getBoundingClientRect();
                const clientX = event.touches ? event.touches[0].clientX : event.clientX;
                const percentage = (clientX - sliderRect.left) / sliderRect.width;
                const newValue = Math.round(percentage * (max - min) + min);

                onChange({ target: { value: Math.max(min, Math.min(max, newValue)) } });
            }
        },
        [isDragging, min, max, onChange]
    );

    useEffect(() => {
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [handleMove, handleMouseUp]);

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div
            ref={sliderRef}
            className={`relative w-full h-6 cursor-pointer ${isDragging ? 'cursor-ew-resize' : 'cursor-ew-resize'}`} // Change cursor style
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown} // Handle touch start
        >
            <div className="absolute w-full h-2 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2">
                <div
                    className="absolute h-full bg-purple-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div
                className="absolute w-6 h-6 bg-purple-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${percentage}%` }}
            ></div>
        </div>
    );
};
