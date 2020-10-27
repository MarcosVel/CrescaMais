import React, { useEffect, useState } from 'react';
import './App.css';
import api from './api';

function App() {
  const [courses, setCourses] = useState('');
  const [users, setUsers] = useState('');

  useEffect(() => {
    const response = api.get('')

    setCourses(response.data)
  })

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
