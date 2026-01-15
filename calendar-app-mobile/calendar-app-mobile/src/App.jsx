import { useState, useEffect } from 'react'
import './App.css'
import { initAds } from './adInit'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getDayOfYear(year, month, day) {
  const date = new Date(year, month, day);
  const startOfYear = new Date(year, 0, 1);
  const diff = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay) + 1;
}

function isToday(year, month, day) {
  const today = new Date();
  return today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;
}

function App() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentView, setCurrentView] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [notes, setNotes] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('calendarNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    
    // Initialize ads after component mounts
    setTimeout(() => {
      initAds();
    }, 1000);
  }, []);

  const saveNote = () => {
    if (!selectedDate) return;
    
    const { year, month, day } = selectedDate;
    const dateKey = `${year}-${month + 1}-${day}`;
    const newNotes = { ...notes };

    if (noteText.trim()) {
      newNotes[dateKey] = noteText.trim();
    } else {
      delete newNotes[dateKey];
    }

    setNotes(newNotes);
    localStorage.setItem('calendarNotes', JSON.stringify(newNotes));
    setModalOpen(false);
    setSelectedDate(null);
    setNoteText('');
  };

  const openNoteModal = (year, month, day) => {
    const dateKey = `${year}-${month + 1}-${day}`;
    setSelectedDate({ year, month, day });
    setNoteText(notes[dateKey] || '');
    setModalOpen(true);
  };

  const renderMonthView = () => {
    const firstDay = new Date(currentYear, selectedMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${selectedMonth + 1}-${day}`;
      const dayOfYear = getDayOfYear(currentYear, selectedMonth, day);
      const isTodayDate = isToday(currentYear, selectedMonth, day);
      const hasNote = notes[dateKey];

      days.push(
        <div
          key={day}
          className={`day ${isTodayDate ? 'today' : ''} ${hasNote ? 'has-note' : ''}`}
          onClick={() => openNoteModal(currentYear, selectedMonth, day)}
        >
          <div className="day-number">{dayOfYear}</div>
          <div className="day-label">{day}</div>
        </div>
      );
    }

    return days;
  };

  const renderYearView = () => {
    const days = [];
    
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${currentYear}-${month + 1}-${day}`;
        const isTodayDate = isToday(currentYear, month, day);
        const hasNote = notes[dateKey];

        days.push(
          <div
            key={`${month}-${day}`}
            className={`year-day ${isTodayDate ? 'today' : ''} ${hasNote ? 'has-note' : ''}`}
            onClick={() => openNoteModal(currentYear, month, day)}
          />
        );
      }
    }

    return days;
  };

  return (
    <div className="app">
      <div className="grain"></div>
      
      <header className="header">
        <h1 className="title">365 Days</h1>
        
        <div className="year-selector">
          <button onClick={() => setCurrentYear(currentYear - 1)}>←</button>
          <div className="year-display">{currentYear}</div>
          <button onClick={() => setCurrentYear(currentYear + 1)}>→</button>
        </div>

        <div className="view-toggle">
          <button
            className={currentView === 'month' ? 'active' : ''}
            onClick={() => setCurrentView('month')}
          >
            Month
          </button>
          <button
            className={currentView === 'year' ? 'active' : ''}
            onClick={() => setCurrentView('year')}
          >
            Year
          </button>
        </div>
      </header>

      {currentView === 'month' ? (
        <div className="month-view">
          <div className="month-selector">
            <button
              onClick={() => setSelectedMonth((selectedMonth - 1 + 12) % 12)}
            >
              ←
            </button>
            <h2 className="month-name">{monthNames[selectedMonth]}</h2>
            <button
              onClick={() => setSelectedMonth((selectedMonth + 1) % 12)}
            >
              →
            </button>
          </div>

          <div className="calendar">
            <div className="weekdays">
              {weekDays.map((day, i) => (
                <div key={i} className="weekday">{day}</div>
              ))}
            </div>
            <div className="days-grid">
              {renderMonthView()}
            </div>
          </div>
        </div>
      ) : (
        <div className="year-view">
          <div className="year-grid">
            {renderYearView()}
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="modal" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                Day {getDayOfYear(selectedDate.year, selectedDate.month, selectedDate.day)} - {monthNames[selectedDate.month]} {selectedDate.day}
              </h3>
              <button className="close-btn" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <textarea
              className="note-input"
              placeholder="Write your note for this day..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              autoFocus
            />
            <button className="save-btn" onClick={saveNote}>Save Note</button>
          </div>
        </div>
      )}

      {/* Ad Banner */}
      <div className="ad-container">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
}

export default App
