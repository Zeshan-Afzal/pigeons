import React, { useEffect, useState } from "react";
import { app } from "../firebase.js";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 50,
    discountPrice: 0,
    bathrooms: 0,
    bedrooms: 0,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
    imageUrls: [],
  });
  const params = useParams();
  const navigat = useNavigate();
  useEffect(() => {
    const getListing = async () => {
      const listId = params.listingId;

      try {
        const res = await fetch(
          `https://embland-sbb3.vercel.app/api/listing/get/${listId}`
        );
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getListing();
  }, []);

  const handleUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      setError(null);
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        promises.push(uploadeFileToFireBase(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      setError("imagegs should be less than 7");
    }
  };

  const uploadeFileToFireBase = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = Date.now() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadeFile = uploadBytesResumable(storageRef, file);

      uploadeFile.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploading(Math.round(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadeFile.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleDelete = (deleteurl) => {
    // const storage = getStorage(app);
    // const storageRef = ref(storage, deleteurl);

    // deleteObject(storageRef)
    //   .then((res) => {
    //     console.log("deleted successfully", res);
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url) => url !== deleteurl),
    });
    // })
    // .catch((err) => console.log("error  in deleting", err));
  };

  const handleOnChange = (e) => {
    if (e.target.id === "rent" || e.target.id === "sale") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("at least 1 image is required");
      if (formData.regularPrice < formData.discountPrice)
        return setError("discounted price should be less");
      setError(null);
      setCreating(true);
      const res = await fetch(
        `https://embland-sbb3.vercel.app/api/listing/update/${params.listingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, userRef: currentUser._id }),
        }
      );

      const data = await res.json();
      if (data.success === "false") {
        setError(data.message);
        return;
      }

      setCreating(false);
      navigat(`/listing/${data._id}`);
    } catch (error) {
      setCreating(false);
      setError(error.message);
    }
  };

  return (
    <main className=" max-w-4xl  mx-auto p-7">
      <h1 className=" my-4 text-center font-semibold  text-3xl">
        {" "}
        Update Listing
      </h1>
      <form
        onSubmit={handleCreateListing}
        className=" flex flex-col sm:flex-row gap-4 "
      >
        <div className="flex flex-col flex-1 gap-4 ">
          <div className=" flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className=" p-3 rounded-lg  focus:outline-none"
              onChange={handleOnChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="description"
              id="description"
              className=" p-3 rounded-lg  focus:outline-none"
              onChange={handleOnChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="address"
              id="address"
              className=" p-3 rounded-lg  focus:outline-none"
              onChange={handleOnChange}
              value={formData.address}
            />
          </div>

          <div className=" flex flex-wrap gap-7">
            <div className=" flex gap-2 ">
              <input
                type="checkbox"
                name=""
                id="sale"
                className=" w-5 cursor-pointer border-none"
                onChange={handleOnChange}
                checked={formData.type === "sale"}
              />
              <span className=" font-semibold">Sell</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="rent"
                className=" w-5 cursor-pointer border-none"
                onChange={handleOnChange}
                checked={formData.type === "rent"}
              />
              <span className=" font-semibold">Rent</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="parking"
                className=" w-5 cursor-pointer border-none"
                onChange={handleOnChange}
                value={formData.parking}
              />
              <span className=" font-semibold">Parking Spot</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="furnished"
                className=" w-5 cursor-pointer border-none"
                onChange={handleOnChange}
                checked={formData.furnished}
              />
              <span className=" font-semibold">Furnished</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="offer"
                className=" w-5 cursor-pointer border-none "
                onChange={handleOnChange}
                checked={formData.offer}
              />
              <span className=" font-semibold">Offer</span>
            </div>
          </div>

          <div className=" flex flex-wrap gap-4">
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                name=""
                id="bedrooms"
                className=" p-3 rounded-lg focus:outline-none w-20"
                onChange={handleOnChange}
                value={formData.bedrooms}
              />
              <p className=" font-semibold">Beds</p>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                name=""
                id="bathrooms"
                className=" p-3 rounded-lg focus:outline-none w-20"
                onChange={handleOnChange}
                value={formData.bathrooms}
              />
              <p className=" font-semibold">Baths</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                name=""
                id="regularPrice"
                className=" p-3 rounded-lg focus:outline-none w-24"
                onChange={handleOnChange}
                value={formData.regularPrice}
              />
              <div className=" flex flex-col items-center justify-between ">
                <p className=" font-semibold">Regular Price</p>
                {formData.type === "rent" && (
                  <span className=" text-gray-600">($/months)</span>
                )}
              </div>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-2 ">
                <input
                  type="number"
                  name=""
                  id="discountPrice"
                  className=" p-3 rounded-lg focus:outline-none w-24"
                  onChange={handleOnChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center justify-between">
                  <p className=" font-semibold">Discounted Price</p>
                  {formData.type === "rent" && (
                    <span className=" text-gray-600">($/months)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" flex flex-col flex-1 gap-4 ">
          <div className=" flex items-center gap-2">
            <p className=" font-bold text-xl">Images:</p>
            <span className=" text-gray-600 text-sm">
              the first image will be the cover (max 6 images)
            </span>
          </div>
          <div className=" flex flex-col gap-4">
            <div className=" flex gap-2 justify-between">
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="p-2 border border-gray-600 rounded-lg w-56"
              />
              <button
                type="button"
                disabled={loading || creating}
                onClick={handleUpload}
                className=" p-2 rounded-lg border border-blue-500 text-blue-700 bg-blue-100 w-36 disabled:opacity-75 hover:opacity-80"
              >
                {loading ? ` Uploading ${uploading}%` : "Uploade"}
              </button>
            </div>
            <div className=" flex-col flex gap-2 border border-gray-200 rounded-lg p-2">
              {formData.imageUrls &&
                formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className=" flex justify-between items-center "
                  >
                    <img
                      src={url}
                      alt="listing-image"
                      className=" w-32 h-24 rounded-lg object-contain"
                    />
                    <button
                      onClick={() => handleDelete(url)}
                      type="button"
                      className="text-red-700 p-3 rounded-lg uppercase hover:opacity-75"
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </div>
                ))}
            </div>
            {error && <p className="text-red-600 ">{error}</p>}
            <button
              disabled={creating || loading}
              className=" p-3  bg-amber-900 rounded-lg uppercase  text-white"
            >
              {creating ? "updating..." : "update listing"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default UpdateListing;
