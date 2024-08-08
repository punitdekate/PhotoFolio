import { useEffect, useReducer, useRef, useState } from "react";
import Styles from "./album.module.css";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Config/DbConfig";

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
export default CreateAlbum;
