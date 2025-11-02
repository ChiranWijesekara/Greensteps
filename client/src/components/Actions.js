import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Actions() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    const res = await axios.get('http://localhost:5000/api/actions');
    setActions(res.data);
  };

  return (
    <div>
      <h1>GreenSteps Actions</h1>
      {actions.map(action => (
        <div key={action._id}>
          <h3>{action.title}</h3>
          <p>{action.description}</p>
          <p>Completed: {action.completed ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}

export default Actions;
