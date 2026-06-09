import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Load habits from localStorage on initial render
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  
  const [input, setInput] = useState('');

  // Save habits to localStorage whenever the habits state changes
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Handle adding a new habit
  const addHabit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHabit = {
      id: Date.now(),
      name: input,
      completed: false,
    };

    setHabits([...habits, newHabit]);
    setInput('');
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  // Delete a habit
  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  // Calculate completion percentage
  const completedCount = habits.filter((h) => h.completed).length;
  const completionPercentage = habits.length
    ? Math.round((completedCount / habits.length) * 100)
    : 0;

  return (
    <div className="app-container">
      <header>
        <h1>Routineify</h1>
        <p>Build habits, master consistency.</p>
      </header>

      {/* Progress Bar Section */}
      <div className="progress-container">
        <div className="progress-stats">
          <span>Today's Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={addHabit} className="habit-form">
        <input
          type="text"
          placeholder="Enter a new habit (e.g., Read 10 pages)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Habit</button>
      </form>

      {/* Habits List */}
      <div className="habit-list">
        {habits.length === 0 ? (
          <p className="empty-message">No habits added yet. Start small!</p>
        ) : (
          habits.map((habit) => (
            <div key={habit.id} className={`habit-item ${habit.completed ? 'completed' : ''}`}>
              <div className="habit-text" onClick={() => toggleComplete(habit.id)}>
                <span className="checkbox">
                  {habit.completed ? '✓' : ''}
                </span>
                <span className="habit-name">{habit.name}</span>
              </div>
              <button className="delete-btn" onClick={() => deleteHabit(habit.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
