import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  // const [files, setFiles] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    clogo: [],
    cname: "Company A",
    cemail: "company@gmail.com",
    pname: "Senior Software Engineer",
    role: "Programmer",
    commitment: "Full-time",
    jdesc: "Programming",
    salary: "40000",
    // userRef: "",
  });

  // const [showOptions, setShowOptions] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  // const options = ["Full-time", "Part-time", "Contract"];

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    // if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
    if (files.length > 0 && files.length + formData.clogo.length <= 1) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            clogo: formData.clogo.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      // setImageUploadError("You can only upload 6 images per listing");
      setImageUploadError("You can only upload 1 image per Job Board");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      clogo: formData.clogo.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    // #dito nalang sa check box, kung hybrid, remote, onsite
    // if (e.target.id === "sale" || e.target.id === "rent") {
    //   setFormData({
    //     ...formData,
    //     type: e.target.id,
    //   });
    // }

    // if (
    //   e.target.id === "parking" ||
    //   e.target.id === "furnished" ||
    //   e.target.id === "offer"
    // ) {
    //   setFormData({
    //     ...formData,
    //     [e.target.id]: e.target.checked,
    //   });
    // }

    // setSelectedOption(e);
    // setShowOptions(false);

    // if (e.target.tagName.toLowerCase() === "select") {
    //   setFormData({
    //     ...formData,
    //     [e.target.id]: e.target.value,
    //   });
    // }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "email"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.clogo.length < 1)
        return setError("You must upload at least one image");
      // if (+formData.regularPrice < +formData.discountPrice)
      //   return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Post a job on JobBoard
        </h1>
        {/* <p className="text-lg mb-6">
          Find the best talent from around the world on the most exclusive job
          board on the internet.
        </p> */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 py-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">1. Your company</h2>
          <div className="mb-4">
            <label
              htmlFor="cname"
              className="block text-gray-700 font-semibold mb-2"
            >
              Company Name *
            </label>
            <input
              // onChange={handleChange}
              onChange={handleChange}
              value={formData.cname}
              type="text"
              id="cname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="E.g., Acme Inc."
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cemail"
              className="block text-gray-700 font-semibold mb-2"
            >
              Contact Email *
            </label>
            <input
              onChange={handleChange}
              value={formData.cemail}
              type="email"
              id="cemail"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="E.g., example@acme.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="companyLogo"
              className="block text-gray-700 font-semibold mb-2"
            >
              Company Logo (optional)
            </label>
            {/* <div className="flex items-center justify-between border border-gray-300 rounded-md py-2 px-3">
              <label htmlFor="images" className="cursor-pointer text-blue-500">
                Upload
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  // multiple
                  // className="hidden"
                />
              </label>
              <span className="text-gray-500">No file chosen</span>
            </div> */}
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.clogo.length > 0 &&
              formData.clogo.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">2. The role</h2>
          <div className="mb-4">
            <label
              htmlFor="pname"
              className="block text-gray-700 font-semibold mb-2"
            >
              Position Name *
            </label>
            <input
              onChange={handleChange}
              value={formData.pname}
              type="text"
              id="pname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="E.g., Senior Software Engineer"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-semibold mb-2"
            >
              Role *
            </label>
            <textarea
              onChange={handleChange}
              value={formData.role}
              id="role"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Programming, Design, etc."
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="commitment"
              className="block text-gray-700 font-semibold mb-2"
            >
              Commitment *
            </label>
            <input
              onChange={handleChange}
              value={formData.commitment}
              id="commitment"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Programming, Design, etc."
              required
            ></input>
          </div>

          {/* <div className="mb-4 custom-select">
            <label
              htmlFor="commitment"
              className="block text-gray-700 font-semibold mb-2"
            >
              Commitment *
            </label>
            <select
              onChange={handleChange}
              value={formData.commitment}
              id="commitment"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select commitment</option>
              <option value="fullTime">Full-time</option>
              <option value="partTime">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div> */}

          {/* <div className="mb-4 relative">
            <label
              htmlFor="commitment"
              className="block text-gray-700 font-semibold mb-2"
            >
              Commitment *
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="Select commitment"
                value={selectedOption}
                onFocus={() => setShowOptions(true)}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />

              {showOptions && (
                <ul className="absolute top-full left-0 z-10 bg-white border border-gray-300 rounded-md w-full max-h-48 overflow-y-auto">
                  {options.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleChange(option)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="jdesc"
              className="block text-gray-700 font-semibold mb-2"
            >
              Job Description *
            </label>
            <textarea
              type="text"
              onChange={handleChange}
              value={formData.jdesc}
              id="jdesc"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Describe the job..."
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-gray-700 font-semibold mb-2"
            >
              Salary (optional)
            </label>
            <input
              onChange={handleChange}
              value={formData.salary}
              type="text"
              id="salary"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Example: “$100,000 - $170,000 USD”"
            />
          </div>

          <button
            // type="submit"
            disabled={loading || uploading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
