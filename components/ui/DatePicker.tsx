import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  rangeHighlight?: { start: Date; end: Date };
}

export function DatePicker({ 
  value, 
  onChange, 
  placeholder = 'Pick a date', 
  minDate, 
  maxDate, 
  rangeHighlight 
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateInRange = (date: Date) => {
    if (!rangeHighlight) return false;
    return date >= rangeHighlight.start && date <= rangeHighlight.end;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    if (!value) return false;
    return date.toDateString() === value.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    
    onChange?.(date);
    setOpen(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-9 h-9"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const disabled = isDateDisabled(date);
      const inRange = isDateInRange(date);
      const today = isToday(date);
      const selected = isSelected(date);

      days.push(
        <button
          key={day}
          type="button"
          className={`
            w-9 h-9 text-sm font-medium rounded-md transition-all duration-200 hover:scale-105
            ${disabled 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-[#864d25] hover:bg-[#f3e3c3] cursor-pointer'
            }
            ${selected 
              ? 'bg-[#864d25] text-white hover:bg-[#864d25] shadow-lg' 
              : ''
            }
            ${today && !selected 
              ? 'border-2 border-[#864d25]' 
              : ''
            }
            ${inRange && !selected 
              ? 'bg-[#f3e3c3] text-[#864d25]' 
              : ''
            }
          `}
          onClick={() => handleDateClick(date)}
          disabled={disabled}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        className="w-full flex items-center gap-3 pl-4 pr-4 py-3 bg-[#fff7e1] border border-[#864d25]/30 rounded-lg text-[#864d25] placeholder-gray-500 focus:border-[#864d25] focus:outline-none focus:ring-2 focus:ring-[#864d25]/50 hover:bg-[#f3e3c3] transition-colors text-left shadow-md"
        onClick={() => setOpen(!open)}
      >
        <CalendarDays className="w-5 h-5 text-[#864d25]" />
        <span className={value ? 'text-[#864d25]' : 'text-[#bfa074] text-[13px] font-medium'}>
          {value ? value.toLocaleDateString() : placeholder}
        </span>
      </button>

      {open && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-[9998]  backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          {/* Calendar Modal */}
          <div className="fixed z-[9999] left-1/2 -top-12 -translate-x-1/2 -translate-y-1/2 w-[99vw] max-w-sm bg-[#fff7e1] border border-[#e2c9a0] rounded-2xl shadow-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 mt-5">
              <button
                type="button"
                className="p-2 hover:bg-[#f3e3c3] rounded-full transition-colors"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="w-5 h-5 text-[#864d25]" />
              </button>
              
              <h3 className="text-lg font-semibold text-[#864d25]">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              
              <button
                type="button"
                className="p-2 hover:bg-[#f3e3c3] rounded-full transition-colors"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="w-5 h-5 text-[#864d25]" />
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              className="absolute top-2 right-2 text-[#864d25] hover:bg-[#f3e3c3] rounded-full w-7 h-7 flex items-center justify-center transition-colors text-2xl font-bold leading-none"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-medium text-[#bfa074] py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}