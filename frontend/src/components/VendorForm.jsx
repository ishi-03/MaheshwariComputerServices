import React from "react";

const VendorForm = ({
  form,
  handleChange,
  handleSubmit,
  buttonText = "Create",
  handleDelete,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Vendor Name"
        value={form.username}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Vendor Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        {buttonText}
      </button>

      {handleDelete && (
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition ml-2"
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default VendorForm;
