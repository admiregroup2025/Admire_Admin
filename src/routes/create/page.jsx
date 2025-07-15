import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

const CreateItineriesPage = () => {
  // Initialize state with a structure matching the JSON payload
  const [formData, setFormData] = useState({
    title: "",
    itinerary_visibility: "public",
    itinerary_type: "flexible",
    duration: "",
    selected_destination: "",
    itinerary_theme: "Family",
    destination_detail: "",
    inclusion: "",
    exclusion: "",
    terms_and_conditions: "",
    pricing: "",
    discount: "",
    destination_thumbnail: "",
    destination_images: [""],
    hotel_details: [{ type: "Delux", roomType: "", price: "", discount: "" }],
    days_information: [{ day: "1", locationName: "", locationDetail: "" }],
  });

  // --- HANDLER FUNCTIONS ---

  // Handles changes for simple, top-level input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles changes for fields within an array (e.g., hotel_details, days_information)
  const handleArrayChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    const newArray = [...formData[arrayName]];
    newArray[index][name] = value;
    setFormData((prev) => ({ ...prev, [arrayName]: newArray }));
  };

  // Handles changes for the destination_images array
  const handleImageChange = (e, index) => {
    const newImages = [...formData.destination_images];
    newImages[index] = e.target.value;
    setFormData((prev) => ({ ...prev, destination_images: newImages }));
  };

  // Adds a new item to an array (for hotels, days, images)
  const handleAddItem = (arrayName, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem],
    }));
  };

  // Removes an item from an array by its index
  const handleRemoveItem = (index, arrayName) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [arrayName]: newArray }));
  };

  // --- SUBMIT FUNCTION ---
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log("Submitting Itinerary Data:", JSON.stringify(formData, null, 2));
    alert("Form data has been logged to the console. Press F12 to view.");
  };

  // --- STYLING CLASSES (for consistency) ---
  const inputStyle = "block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-300 mb-1";
  const cardStyle = "bg-gray-800 p-6 rounded-lg shadow-md";
  const buttonStyle = "flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500";
  const removeButtonStyle = "flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500";


  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Itinerary</h1>
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Section 1: Core Itinerary Details */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Core Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className={labelStyle}>Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} className={inputStyle} required />
              </div>
              <div>
                <label htmlFor="selected_destination" className={labelStyle}>Destination</label>
                <input type="text" name="selected_destination" id="selected_destination" value={formData.selected_destination} onChange={handleInputChange} className={inputStyle} required />
              </div>
              <div>
                <label htmlFor="duration" className={labelStyle}>Duration (e.g., 10 Days / 9 Nights)</label>
                <input type="text" name="duration" id="duration" value={formData.duration} onChange={handleInputChange} className={inputStyle} required />
              </div>
              <div>
                <label htmlFor="itinerary_theme" className={labelStyle}>Theme</label>
                <select name="itinerary_theme" id="itinerary_theme" value={formData.itinerary_theme} onChange={handleInputChange} className={inputStyle}>
                  <option>Family</option>
                  <option>Honeymoon</option>
                  <option>Advantures</option>
                  <option>Solo</option>
                </select>
              </div>
              <div>
                <label htmlFor="itinerary_type" className={labelStyle}>Type</label>
                <select name="itinerary_type" id="itinerary_type" value={formData.itinerary_type} onChange={handleInputChange} className={inputStyle}>
                  <option value="flexible">Flexible</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
              <div>
                <label htmlFor="itinerary_visibility" className={labelStyle}>Visibility</label>
                <select name="itinerary_visibility" id="itinerary_visibility" value={formData.itinerary_visibility} onChange={handleInputChange} className={inputStyle}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing and Media */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Pricing & Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="pricing" className={labelStyle}>Pricing ($)</label>
                <input type="number" name="pricing" id="pricing" value={formData.pricing} onChange={handleInputChange} className={inputStyle} />
              </div>
              <div>
                <label htmlFor="discount" className={labelStyle}>Discount ($)</label>
                <input type="number" name="discount" id="discount" value={formData.discount} onChange={handleInputChange} className={inputStyle} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="destination_thumbnail" className={labelStyle}>Thumbnail Image URL</label>
                <input type="url" name="destination_thumbnail" id="destination_thumbnail" value={formData.destination_thumbnail} onChange={handleInputChange} className={inputStyle} placeholder="https://example.com/image.jpg" />
              </div>
            </div>
            {/* Dynamic Destination Images */}
            <div className="mt-6">
              <label className={labelStyle}>Destination Image URLs</label>
              <div className="space-y-3">
                {formData.destination_images.map((image, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input type="url" value={image} onChange={(e) => handleImageChange(e, index)} className={inputStyle} placeholder="https://example.com/gallery.jpg" />
                    {formData.destination_images.length > 1 && (
                      <button type="button" onClick={() => handleRemoveItem(index, "destination_images")} className={removeButtonStyle}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => handleAddItem("destination_images", "")} className={`${buttonStyle} mt-3`}>
                <PlusCircle size={16} /> Add Image
              </button>
            </div>
          </div>

          {/* Section 3: Text Details */}
          <div className={cardStyle + " space-y-4"}>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Descriptions</h2>
            <div>
              <label htmlFor="destination_detail" className={labelStyle}>Destination Detail</label>
              <textarea name="destination_detail" id="destination_detail" rows="4" value={formData.destination_detail} onChange={handleInputChange} className={inputStyle}></textarea>
            </div>
            <div>
              <label htmlFor="inclusion" className={labelStyle}>Inclusions (use HTML for lists)</label>
              <textarea name="inclusion" id="inclusion" rows="4" value={formData.inclusion} onChange={handleInputChange} className={inputStyle} placeholder="e.g., <li>Item 1</li>"></textarea>
            </div>
            <div>
              <label htmlFor="exclusion" className={labelStyle}>Exclusions</label>
              <textarea name="exclusion" id="exclusion" rows="4" value={formData.exclusion} onChange={handleInputChange} className={inputStyle}></textarea>
            </div>
            <div>
              <label htmlFor="terms_and_conditions" className={labelStyle}>Terms & Conditions</label>
              <textarea name="terms_and_conditions" id="terms_and_conditions" rows="4" value={formData.terms_and_conditions} onChange={handleInputChange} className={inputStyle}></textarea>
            </div>
          </div>

          {/* Section 4: Dynamic Hotel Details */}
          {/* Section 4: Dynamic Hotel Details */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-4">Hotel Details</h2>
            <div className="space-y-6">
              {formData.hotel_details.map((hotel, index) => (
                <div key={index} className="p-4 border border-gray-700 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                      {/* --- UPDATED: Changed from input to select --- */}
                      <label className={labelStyle}>Type</label>
                      <select
                        name="type"
                        value={hotel.type}
                        onChange={(e) => handleArrayChange(e, index, "hotel_details")}
                        className={inputStyle}
                        required
                      >
                        <option value="Delux">Delux</option>
                        <option value="Super Delux">Super Delux</option>
                        <option value="Standard">Standard</option>
                      </select>
                    </div>
                    <div className="lg:col-span-2">
                      <label className={labelStyle}>Room Type (e.g., Double Room)</label>
                      <input
                        type="text"
                        name="roomType"
                        value={hotel.roomType}
                        onChange={(e) => handleArrayChange(e, index, "hotel_details")}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        value={hotel.price}
                        onChange={(e) => handleArrayChange(e, index, "hotel_details")}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>Discount ($)</label>
                      <input
                        type="number"
                        name="discount"
                        value={hotel.discount}
                        onChange={(e) => handleArrayChange(e, index, "hotel_details")}
                        className={inputStyle}
                      />
                    </div>
                    {formData.hotel_details.length > 1 && (
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index, "hotel_details")}
                          className={removeButtonStyle}
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* --- UPDATED: Added a default type for new items --- */}
            <button
              type="button"
              onClick={() =>
                handleAddItem("hotel_details", {
                  type: "Delux", // Default to a valid enum value
                  roomType: "",
                  price: "",
                  discount: "",
                })
              }
              className={`${buttonStyle} mt-4`}
            >
              <PlusCircle size={16} /> Add Hotel Option
            </button>
          </div>

          {/* Section 5: Dynamic Day-by-Day Information */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-4">Day-by-Day Itinerary</h2>
            <div className="space-y-6">
              {formData.days_information.map((dayInfo, index) => (
                <div key={index} className="p-4 border border-gray-700 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Day {dayInfo.day}</h3>
                    {formData.days_information.length > 1 && (
                      <button type="button" onClick={() => handleRemoveItem(index, "days_information")} className={removeButtonStyle}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyle}>Day Number</label>
                      <input type="number" name="day" value={dayInfo.day} onChange={(e) => handleArrayChange(e, index, "days_information")} className={inputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>Location Name</label>
                      <input type="text" name="locationName" value={dayInfo.locationName} onChange={(e) => handleArrayChange(e, index, "days_information")} className={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label className={labelStyle}>Location Detail</label>
                    <textarea name="locationDetail" rows="3" value={dayInfo.locationDetail} onChange={(e) => handleArrayChange(e, index, "days_information")} className={inputStyle}></textarea>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => handleAddItem("days_information", { day: formData.days_information.length + 1, locationName: "", locationDetail: "" })} className={`${buttonStyle} mt-4`}>
              <PlusCircle size={16} /> Add Day
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" className="text-lg font-bold rounded-lg bg-green-600 px-8 py-3 text-white shadow-sm hover:bg-green-500">
              Create Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItineriesPage; 