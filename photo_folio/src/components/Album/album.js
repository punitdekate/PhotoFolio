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
import CreateAlbum from "./CreateAlbum";

export default function Album({ setAlbumId, setAlbumActive }) {
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

  useEffect(() => {
    // const fetchDocument = async () => {
    //   const docRef = doc(db, "albums", "Quatcw1ULNwdxBcBCQlu");
    //   const docSnap = await getDoc(docRef);
    //   console.log(docSnap.data());
    //   const image = {
    //     title: "Funny",
    //     imageUrl: "https://dilse.com",
    //   };
    //   const imagesCollectionRef = collection(
    //     db,
    //     "albums",
    //     "Quatcw1ULNwdxBcBCQlu",
    //     "images"
    //   );
    // Add the new image to the 'images' subcollection
    // await addDoc(imagesCollectionRef, image);
    // };
    // fetchDocument();
  });

  const handleAlbumForm = () => {
    setIsFormActive(!isFormActive);
  };

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
