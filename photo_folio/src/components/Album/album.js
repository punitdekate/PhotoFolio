import { useEffect, useReducer, useRef, useState } from "react";
import Styles from "./album.module.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../Config/DbConfig";

function albumReducer(state, action) {
  const payload = action;
  // switch(action.type){
  //     case "ADD_ALBUM" :
  //         return state
  // }
}
export default function Album() {
  const [albums, setAlbums] = useState([]);
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      const snapShot = await getDocs(collection(db, "albums"));
      console.log(snapShot);
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(blogs);
      setAlbums(blogs);
    };
    fetchAlbums();
  }, []);

  const handleAlbumForm = () => {};

  return (
    <div className={Styles.album}>
      <CreateAlbum />
      <div className={Styles.album_header}>
        <div>
          <h2>Albums</h2>
        </div>
        <div>
          <button type="button" onClick={handleAlbumForm}>
            Add Album
          </button>
        </div>
      </div>
      <div className={Styles.album_content}>
        {/* Map all albums here from the available in albums collection */}
        {albums.map((ele) => {
          return (
            <div className={Styles.album_outer} key={ele.id}>
              <div className={Styles.album_inner}>{ele.album.albumName}</div>
            </div>
          );
        })}
      </div>
      <div className={Styles.album_pagination}></div>
    </div>
  );
}

function CreateAlbum() {
  const [album, setAlbum] = useState({ albumName: "" });
  const handleClearAlbumName = () => {
    setAlbum({ albumName: "" });
  };

  const handleAddAlbum = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "albums"), {
      album,
    });
    setAlbum({ albumName: "" });
  };
  return (
    <div>
      <form onSubmit={(e) => handleAddAlbum(e)}>
        <div>Create New Album</div>
        <div>
          <div>
            <input
              name="albumName"
              value={album.albumName}
              onChange={(e) => setAlbum({ albumName: e.target.value })}
              placeholder="Album Name"
              required
            />
          </div>
          <div>
            <button onClick={handleClearAlbumName}>Clear</button>
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}
