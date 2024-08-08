import Styles from "./images.module.css";
import StylesFromAlbum from "../Album/album.module.css";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Config/DbConfig";

function AddImage({ albumId }) {
  const [imageForm, setImageForm] = useState({ title: "", imageUrl: "" });

  const handleClear = () => {
    setImageForm({ title: "", imageUrl: "" });
  };

  useEffect(() => {});

  const handleImageAddForm = async (e) => {
    e.preventDefault();
    const imagesCollectionRef = collection(db, "albums", albumId, "images");
    // Add the new image to the 'images' subcollection
    await addDoc(imagesCollectionRef, imageForm);
    handleClear();
  };

  return (
    <div className={Styles.add_image_form}>
      {/*Add Image Form heading */}
      <div>
        <h1>Add image to Albums</h1>
      </div>
      <div>
        <form onSubmit={(e) => handleImageAddForm(e)}>
          <div>
            {/* Image Title */}
            <input
              type="text"
              value={imageForm.title}
              onChange={(e) => {
                setImageForm({
                  title: e.target.value,
                  imageUrl: imageForm.imageUrl,
                });
              }}
              placeholder="Title"
              required
              // className={StylesFromAlbum.album_form_input}
            />
          </div>
          <div>
            {/* Image URL */}
            <input
              type="text"
              value={imageForm.imageUrl}
              onChange={(e) => {
                setImageForm({
                  title: imageForm.title,
                  imageUrl: e.target.value,
                });
              }}
              placeholder="Image URL"
              // className={StylesFromAlbum.album_form_input}
              required
            />
          </div>
          <div className={Styles.add_image_form_btns}>
            <div>
              {/* Clear Button */}
              <button className={StylesFromAlbum.btn_red} onClick={handleClear}>
                Clear
              </button>
            </div>
            <div>
              {/* Add Button */}
              <button type="submit" className={StylesFromAlbum.btn_blue}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ImageGallery({ albumId, setAlbumActive }) {
  const [images, setImages] = useState([]);
  const [addImageActive, setAddImageActive] = useState(false);
  const searchRef = useRef();
  const handleSearch = () => {};

  useEffect(() => {
    searchRef.current.focus();
  });
  useEffect(() => {
    // Set up the snapshot listener for the images subcollection of the specified album
    const unsub = onSnapshot(
      collection(db, "albums", albumId, "images"),
      (snapShot) => {
        const albumDocs = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(albumDocs);
      },
      (error) => {
        console.error("Error fetching images: ", error);
      }
    );

    // Clean up the subscription on component unmount
    return () => unsub();
  }, [albumId]);

  const handleAddImage = () => {
    setAddImageActive(!addImageActive);
  };

  const handleBack = () => {
    setAlbumActive(true);
  };
  return (
    <div className={Styles.image_gallery}>
      <div>{addImageActive && <AddImage albumId={albumId} />}</div>
      <div className={Styles.image_gallery_header}>
        <div className={Styles.image_gallery_header_left}>
          <div className={Styles.margin_css}>
            <button
              onClick={handleBack}
              className={`${StylesFromAlbum.btn_red}`}
            >
              Back
            </button>
          </div>
          <div>
            <h2>Images In Album</h2>
          </div>
        </div>
        <div className={Styles.image_gallery_header_left}>
          <div>
            <form onSubmit={handleSearch}>
              <input
                type="search"
                className={`${Styles.margin_css} ${Styles.input_css}`}
                placeholder="Search..."
                ref={searchRef}
              />
              <button
                type="submit"
                className={`${Styles.margin_css} ${StylesFromAlbum.btn_blue}`}
              >
                Search
              </button>
            </form>
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddImage}
              className={
                addImageActive
                  ? `${Styles.margin_css} ${StylesFromAlbum.btn_red}`
                  : `${Styles.margin_css} ${StylesFromAlbum.btn_blue}`
              }
            >
              {!addImageActive ? "Add Image" : "Cancel"}
            </button>
          </div>
        </div>
      </div>
      <div className={StylesFromAlbum.album_content}>
        {/* map all images for the respective album */}
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={`${Styles.image_container} ${Styles.margin_css}`}
            >
              <div>
                <img src={image.imageUrl} className={Styles.image_css} />
              </div>
              <div className={StylesFromAlbum.text_bold}>{image.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ImageGallery };
