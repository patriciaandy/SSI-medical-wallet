import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentMainView, setCurrentMainView] = useState('Credentials');
  const [currentSubView, setCurrentSubView] = useState('Health ID');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState({
    givenName: false,
    surname: false,
  });
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleLogin = () => {
    if (username === 'hyperledgerandy' && password === '123') {
      setIsLoggedIn(true);
    } else {
      setLoginError('Incorrect username or password');
    }
  };

  const handleShare = () => {
    setIsSharing(true);
  };

  const handleSelectAll = () => {
    setSelectedInfo({
      givenName: true,
      surname: true,
    });
  };

  const handleAuthorize = () => {
    setIsAuthorized(true);
  };

  const handleCheckboxChange = (field) => {
    setSelectedInfo((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="App login-background">
        <header className="App-header">CEA Curekey</header>
        <div className="wrapper">
          <div className="title">
            Login Form
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="field">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <label>Username</label>
            </div>
            <div className="field">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label>Password</label>
            </div>
            <div className="field">
              <input type="submit" value="Login" />
            </div>
            {loginError && <div className="error-message">{loginError}</div>}
          </form>
        </div>
      </div>
    );
  }

  if (isAuthorized) {
    return (
      <div className="App">
        <header className="App-header">Authorized Information</header>
        <div className="authorized-info">
          {selectedInfo.givenName && <p>Given Name</p>}
          {selectedInfo.surname && <p>Surname</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">CEA Curekey</header>
      <nav className="App-main-nav">
        <ul>
          <li>
            <button
              className={currentMainView === 'Credentials' ? 'active' : ''}
              onClick={() => setCurrentMainView('Credentials')}
            >
              Credentials
            </button>
          </li>
          <li>
            <button
              className={currentMainView === 'QR Code' ? 'active' : ''}
              onClick={() => setCurrentMainView('QR Code')}
            >
              Requests
            </button>
          </li>
        </ul>
      </nav>
      {currentMainView === 'Credentials' && (
        <>
          <nav className="App-sub-nav">
            <ul>
              <li>
                <button
                  className={currentSubView === 'Health ID' ? 'active' : ''}
                  onClick={() => setCurrentSubView('Health ID')}
                >
                  Health ID
                </button>
              </li>
              <li>
                <button
                  className={currentSubView === 'Medications' ? 'active' : ''}
                  onClick={() => setCurrentSubView('Medications')}
                >
                  Medications
                </button>
              </li>
            </ul>
          </nav>
          <main className="App-main">
            {currentSubView === 'Health ID' && (
              <div className="health-id-box">
                <h2>Health ID</h2>
                <div className="medical-info">
                  {!isSharing ? (
                    <>
                      <p>Given Name</p>
                      <p>Surname</p>
                      <button className="share-button" onClick={handleShare}>Share</button>
                    </>
                  ) : (
                    <>
                      <button className="select-all-button" onClick={handleSelectAll}>Select All</button>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedInfo.givenName}
                          onChange={() => handleCheckboxChange('givenName')}
                        />
                        Given Name
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedInfo.surname}
                          onChange={() => handleCheckboxChange('surname')}
                        />
                        Surname
                      </label>
                      <button className="authorize-button" onClick={handleAuthorize}>Authorize</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
