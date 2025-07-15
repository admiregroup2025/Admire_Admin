 import { useState } from "react";
import { ImagePlus } from "lucide-react";

const ImageGallery = () => {
  const [travelType, setTravelType] = useState("domestic");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [images, setImages] = useState([]);

  const domesticPlaces = ["Delhi", "Mumbai", "Goa", "Jaipur", "Kerala"];
  const internationalPlaces = ["Paris", "New York", "Tokyo", "Dubai", "Bali"];

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + images.length > 20) {
      alert("You can upload a maximum of 20 images.");
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleTypeChange = (e) => {
    setTravelType(e.target.value);
    setSelectedPlace("");
    setImages([]);
  };

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 sm:p-10">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold border-b pb-3 border-gray-300 dark:border-gray-600">
          Image Gallery
        </h1>

        {/* Travel Type Radio */}
        <div>
          <p className="text-lg font-medium mb-2">Select Travel Type:</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="domestic"
                checked={travelType === "domestic"}
                onChange={handleTypeChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Domestic</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="international"
                checked={travelType === "international"}
                onChange={handleTypeChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">International</span>
            </label>
          </div>
        </div>

        {/* Destination Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Destination
          </label>
          <select
            value={selectedPlace}
            onChange={handlePlaceChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">-- Select --</option>
            {(travelType === "domestic" ? domesticPlaces : internationalPlaces).map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload (Styled with Icon) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Images (Max 20)
          </label>
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            <ImagePlus size={36} className="text-blue-600 dark:text-blue-400" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Click to upload or drag & drop images here
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {images.length} / 20 selected
            </span>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Image Previews */}
        {images.length > 0 && (
          <div>
            <p className="text-lg font-semibold mb-3">Image Preview</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded border border-gray-300 dark:border-gray-600 overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                    className="h-32 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
 