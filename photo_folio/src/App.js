import "./app.css";
import Navbar from "./components/navbar/Navbar";
import Album from "./components/Album/album";
import { ImageGallery } from "./components/Image/images";
import { useState } from "react";
function App() {
  const [albumActive, setAlbumActive] = useState(true);
  const [albumId, setAlbumId] = useState("");
  const [isBlur, setIsBlur] = useState(false);
  return (
    <>
      <div className="app-container">
        <Navbar />
        {albumActive ? (
          <Album
            setAlbumId={setAlbumId}
            setAlbumActive={setAlbumActive}
            isBlur={isBlur}
          />
        ) : (
          <ImageGallery
            albumId={albumId}
            setAlbumActive={setAlbumActive}
            setIsBlur={setIsBlur}
          />
        )}
      </div>
    </>
  );
}

export default App;
