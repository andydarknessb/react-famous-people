import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FamousSection.css';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await axios.get('/people');
      setPeopleArray(response.data);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const addPerson = async (evt) => {
    evt.preventDefault();

    try {
      await axios.post('/people', { name: famousPersonName, role: famousPersonRole });
      fetchPeople();
      setPersonName('');
      setPersonRole('');
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  return (
    <section className="new-person-section">
      <form onSubmit={addPerson}>
        <label htmlFor="name-input">Name:</label>
        <input id="name-input" value={famousPersonName} onChange={(e) => setPersonName(e.target.value)} />
        <label htmlFor="role-input">Famous for:</label>
        <input id="role-input" value={famousPersonRole} onChange={(e) => setPersonRole(e.target.value)} />
        <button type="submit">Done</button>
      </form>
      <p>
        {famousPersonName} is famous for "{famousPersonRole}".
      </p>
      <ul>
        {famousPeopleArray.map((person) => (
          <li key={person.id}>
            {person.name} - {person.role}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FamousSection;
