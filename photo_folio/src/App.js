import "./app.css";
import Navbar from "./components/navbar/Navbar";
import Album from "./components/Album/album";
function App() {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <Album />
      </div>
    </>
  );
}

export default App;
