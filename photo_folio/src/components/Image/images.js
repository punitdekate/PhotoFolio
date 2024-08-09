import Styles from "./images.module.css";
import StylesFromAlbum from "../Album/album.module.css";
import { useEffect, useRef, useState } from "react";
import Carousel from "../Carousel/Carousel";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Config/DbConfig";
import { PopUp } from "../Utility/PopUp";

function EditImage({ updateImageData, albumId, setEditImageActive }) {
  const [imageForm, setImageForm] = useState({ title: "", imageUrl: "" });

  useEffect(() => {
    setImageForm({
      title: updateImageData.title,
      imageUrl: updateImageData.imageUrl,
    });
  }, []);

  const handleImageUpdateForm = async (e) => {
    e.preventDefault();
    if (imageForm.title === "" || imageForm.imageUrl === "") {
      return;
    }

    const imagesCollectionRef = collection(db, "albums", albumId, "images");
    // Assuming you have an imageId to identify the image to update
    const imageRef = doc(imagesCollectionRef, updateImageData.id); // Replace imageId with the actual ID

    await setDoc(imageRef, imageForm, { merge: true }); // Merge updates to avoid overwriting existing fields
    setEditImageActive(false);
  };
  return (
    <div className={Styles.add_image_form}>
      {/*Add Image Form heading */}
      <div>
        <h1>Add image to Albums</h1>
      </div>
      <div className={Styles.add_image_form_input_fields}>
        <form onSubmit={(e) => handleImageUpdateForm(e)}>
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

function AddImage({ albumId, setAddImageActive }) {
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
    setAddImageActive(false);
    handleClear();
  };

  return (
    <div className={Styles.add_image_form}>
      {/*Add Image Form heading */}
      <div>
        <h1>Add image to Albums</h1>
      </div>
      <div className={Styles.add_image_form_input_fields}>
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

function ImageGallery({ albumId, setAlbumActive, setIsBlur }) {
  const [images, setImages] = useState([]);
  const [addImageActive, setAddImageActive] = useState(false);
  const [editImageActive, setEditImageActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef();
  const [carouselActive, setCarouselActive] = useState(false);
  const [caroIndex, setCaroIndex] = useState(0);
  const [updateImageData, setUpdateImageData] = useState();
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    if (searchInput == "") {
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
    }
  }, [searchInput]);

  const handleSearch = (e) => {
    e.preventDefault();
    let value = searchRef.current.value.toLowerCase(); // Access value directly, not as a function
    const unsub = onSnapshot(
      collection(db, "albums", albumId, "images"),
      (snapShot) => {
        const imageDocs = snapShot.docs
          .filter((doc) => {
            // Add filtering logic here if needed
            return doc.data().title.toLowerCase().includes(value); // Example filter condition
          })
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        setImages(imageDocs);
      },
      (error) => {
        console.error("Error fetching images: ", error);
      }
    );
  };

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
  const handleOpenCarousel = (index) => {
    setCaroIndex(index);
    setCarouselActive(true);
    setIsBlur(true);
  };

  const handleEditImage = (image) => {
    console.log(image);
    setEditImageActive(!editImageActive);
    setUpdateImageData(image);
  };

  const handleDeleteImage = async (id) => {
    // await deleteDoc(doc(db, "cities", "DC"));

    try {
      await deleteDoc(doc(db, "albums", albumId, "images", id));
      setPopUp(true);
      const timer = setTimeout(() => {
        setPopUp(false);
      }, 2000);
      console.log("Image deleted successfully");
      // Update the state after successful deletion
      // const updatedImages = images.filter((image) => image.id !== imageId);
      // setImages(updatedImages);
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  return (
    <div className={Styles.image_gallery}>
      {popUp && <PopUp />}
      {addImageActive && (
        <div className={Styles.image_form}>
          {addImageActive && (
            <AddImage albumId={albumId} setAddImageActive={setAddImageActive} />
          )}
        </div>
      )}
      {editImageActive && (
        <div className={Styles.image_form}>
          {editImageActive && (
            <EditImage
              updateImageData={updateImageData}
              albumId={albumId}
              setEditImageActive={setEditImageActive}
            />
          )}
        </div>
      )}
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
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                type="input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
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
        {carouselActive ? (
          <Carousel
            images={images}
            index={caroIndex}
            setCarouselActive={setCarouselActive}
            setIsBlur={setIsBlur}
          />
        ) : (
          images.map((image, index) => {
            return (
              <div
                key={image.id}
                index={index}
                className={`${Styles.image_container} ${Styles.margin_css}`}
              >
                <div onClick={() => handleOpenCarousel(index)}>
                  <img src={image.imageUrl} className={Styles.image_css} />
                </div>
                <div className={StylesFromAlbum.text_bold}>{image.title}</div>
                <div>
                  <button
                    className={`${Styles.margin_css}`}
                    onClick={() => handleEditImage(image)}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className={`${Styles.margin_css}`}
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export { ImageGallery };
