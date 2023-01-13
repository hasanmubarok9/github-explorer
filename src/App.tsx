import "./App.css";

function App() {
  return (
    <div className="container">
      <div id="search-bar">
        <div className="title">
          <h1>Github Search</h1>
        </div>
        <input type="text" placeholder="Enter Username" name="username" />
        <button>Search</button>
      </div>
    </div>
  );
}

export default App;
