import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ButtonBar.css';

const ButtonBar = () => {
  const [activeButton, setActiveButton] = useState('');

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="button-bar-container">
      <div className="btn-group" role="group" aria-label="Button group">
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'All' ? 'active' : ''}`}
          onClick={() => handleClick('All')}
        >
          All
        </button>
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'Music' ? 'active' : ''}`}
          onClick={() => handleClick('Music')}
        >
          Music
        </button>
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'Mixes' ? 'active' : ''}`}
          onClick={() => handleClick('Mixes')}
        >
          Mixes
        </button>
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'Dieter Bohlen' ? 'active' : ''}`}
          onClick={() => handleClick('Dieter Bohlen')}
        >
          Dieter Bohlen
        </button>
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'Table tennis rackets' ? 'active' : ''}`}
          onClick={() => handleClick('Table tennis rackets')}
        >
          Table tennis rackets
        </button>
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'Basketball courts' ? 'active' : ''}`}
          onClick={() => handleClick('Basketball courts')}
        >
          Basketball courts
        </button>
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'Tennis balls' ? 'active' : ''}`}
          onClick={() => handleClick('Tennis balls')}
        >
          Tennis balls
        </button>
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'Olympic Games' ? 'active' : ''}`}
          onClick={() => handleClick('Olympic Games')}
        >
          Olympic Games
        </button>
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'Live' ? 'active' : ''}`}
          onClick={() => handleClick('Live')}
        >
          Live
        </button>
        <button
          type="button"
          className={`btn custom-btn ${activeButton === 'Algorithms' ? 'active' : ''}`}
          onClick={() => handleClick('Algorithms')}
        >
          Algorithms
        </button>
      </div>
    </div>
  );
};

export default ButtonBar;
