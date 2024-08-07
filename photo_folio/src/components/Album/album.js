import { useEffect, useReducer, useRef, useState } from "react";
import Styles from "./album.module.css";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Config/DbConfig";

export default function Album() {
  const [albums, setAlbums] = useState([]);
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "albums"), (snapShot) => {
      const albumDocs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setAlbums(albumDocs);
    });
  }, []);

  const handleAlbumForm = () => {
    setIsFormActive(!isFormActive);
  };

  const handleOpenAlbum = () => {
    console.log("clicked on album");
  };

  return (
    <div className={Styles.album}>
      {isFormActive && <CreateAlbum />}
      <div className={Styles.album_header}>
        <div>
          <h2>Albums</h2>
        </div>
        <div>
          <button
            type="button"
            onClick={handleAlbumForm}
            className={!isFormActive ? Styles.btn_blue : Styles.btn_red}
          >
            {!isFormActive ? "Add Album" : "Cancel"}
          </button>
        </div>
      </div>
      <div className={Styles.album_content}>
        {/* Map all albums here from the available in albums collection */}
        {albums.map((ele) => {
          return (
            <div className={Styles.album_outer} key={ele.id}>
              <div
                onClick={handleOpenAlbum}
                className={Styles.album_inner}
              ></div>
              <div className={Styles.text_bold}>{ele.album.albumName}</div>
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
  const albumNameInput = useRef();

  useEffect(() => {
    albumNameInput.current.focus();
  }, []);

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
    <div className={Styles.album_create}>
      <form onSubmit={(e) => handleAddAlbum(e)}>
        <div className={Styles.text_center}>
          <h2>Create New Album</h2>{" "}
        </div>
        <div className={Styles.album_form}>
          <div>
            <input
              className={Styles.album_form_input}
              name="albumName"
              value={album.albumName}
              onChange={(e) => setAlbum({ albumName: e.target.value })}
              placeholder="Album Name"
              ref={albumNameInput}
              required
            />
          </div>
          <div>
            <button className={Styles.btn_red} onClick={handleClearAlbumName}>
              Clear
            </button>
          </div>
          <div>
            <button className={Styles.btn_blue} type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
