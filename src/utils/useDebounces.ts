import { useState, useEffect, useRef } from 'react';

const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up function
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;