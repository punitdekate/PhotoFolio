import { useEffect, useState } from "react";
import Styles from "./album.module.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Config/DbConfig";
import CreateAlbum from "./CreateAlbum";

export default function Album({ setAlbumId, setAlbumActive }) {
  const [albums, setAlbums] = useState([]); //To add the albums from database
  const [isFormActive, setIsFormActive] = useState(false); //For conditional rendering of album form

  // To render all the albums
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

  // To open the add new album form
  const handleAlbumForm = () => {
    setIsFormActive(!isFormActive);
  };

  //To open the images in the album
  const handleOpenAlbum = (id) => {
    setAlbumActive(false);
    setAlbumId(id);
  };

  return (
    <>
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
              <div
                className={Styles.album_outer}
                key={ele.id}
                onClick={() => handleOpenAlbum(ele.id)}
              >
                <div className={Styles.album_inner}></div>
                <div className={Styles.text_bold}>{ele.album.albumName}</div>
              </div>
            );
          })}
        </div>
        <div className={Styles.album_pagination}></div>
      </div>
    </>
  );
}
