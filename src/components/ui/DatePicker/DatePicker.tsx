import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

import ErrorMessage from "../../ErrorMessage/ErrorMessage";

import "./DatePicker.scss"

interface DatePickerProps {
    id?: string;
    label?: string;
    dateFormat?: string;
    placeholder?: string;
    className?: string;
    onChange?: (value: Date | null) => void;
    errorMessage?: string;
    [key: string]: any;
}

export default function DatePicker({ id, label, dateFormat = "MM/dd/yyyy", placeholder, className, onChange, errorMessage, ...props }: DatePickerProps) {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const handleChange = (date: Date | null) => {
        setSelectedDate(date)
        onChange?.(date)
    }

    return(
        <div className={`input-wrapper ${errorMessage ? "error" : ""}`}>
            {label && (
                <label htmlFor={id} className="input-label">{label}</label>  
            )}
            <ReactDatePicker
                id={id}
                selected={selectedDate}
                dateFormat={dateFormat}
                onChange={handleChange}
                placeholderText={placeholder}
                className={`input ${className}`}
                {...props}
            />
            <ErrorMessage message={errorMessage} />
        </div>
    )
}