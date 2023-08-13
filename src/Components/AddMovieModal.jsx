/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { Fragment } from "react";
import { v4 as uuid } from "uuid";
import { useData } from "../Context/DataContext";
import { toast } from "react-toastify";

function AddMovieModal({ isOpen, closeModal }) {
  const { dispatch } = useData();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    year: "",
    cast: [],
    genre: [],
    rating: "",
    director: "",
    writer: "",
    imageURL: "",
  });

  const {
    title,
    summary,
    year,
    cast,
    genre,
    rating,
    director,
    writer,
    imageURL,
  } = formData;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedFormData = {
      title: formData.title.trim(),
      summary: formData.summary.trim(),
      year: formData.year.trim(),
      cast: formData.cast.trim(),
      genre: formData.genre.trim(),
      rating: formData.rating.trim(),
      director: formData.director.trim(),
      writer: formData.writer.trim(),
      imageURL: formData.imageURL.trim(),
    };

    const requiredFields = [
      "title",
      "summary",
      "year",
      "cast",
      "genre",
      "rating",
      "director",
      "writer",
    ];
    const areRequiredFieldsEmpty = requiredFields.some(
      (field) => !trimmedFormData[field]
    );

    if (areRequiredFieldsEmpty) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newMovie = {
      id: uuid(),
      ...trimmedFormData,
      year: parseInt(trimmedFormData.year),
      cast: trimmedFormData.cast.split(",").map((item) => item.trim()),
      genre: trimmedFormData.genre.split(",").map((item) => item.trim()),
      rating: parseInt(trimmedFormData.rating),
      imageURL: trimmedFormData.imageURL || "https://picsum.photos/200/300",
    };

    dispatch({ type: "ADD_MOVIE", payload: newMovie });

    closeModal();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Movie
                </Dialog.Title>
                <form onSubmit={handleSubmit}>
                  <div className="mt-4 space-y-4">
                    <label className="block font-medium">Title:</label>
                    <input
                      name="title"
                      type="text"
                      value={title}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />

                    <label className="block font-medium">Summary:</label>
                    <textarea
                      name="summary"
                      value={summary}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded w-full h-20"
                      required
                    />

                    <label className="block font-medium">Year:</label>
                    <select
                      name="year"
                      value={year}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: new Date().getFullYear() - 1900 },
                        (_, index) => (
                          <option
                            key={index}
                            value={new Date().getFullYear() - index}
                          >
                            {new Date().getFullYear() - index}
                          </option>
                        )
                      )}
                    </select>
                    <label className="block font-medium">
                      Cast (comma-separated):
                    </label>
                    <input
                      name="cast"
                      type="text"
                      value={cast}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />

                    <label className="block font-medium">
                      Genre (comma-separated):
                    </label>
                    <input
                      name="genre"
                      type="text"
                      value={genre}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />

                    <label className="block font-medium">Rating:</label>
                    <select
                      name="rating"
                      value={rating}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    >
                      <option value="">Select Rating</option>
                      {Array.from({ length: 10 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>

                    <label className="block font-medium">Director:</label>
                    <input
                      name="director"
                      type="text"
                      value={director}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />

                    <label className="block font-medium">Writer:</label>
                    <input
                      name="writer"
                      type="text"
                      value={writer}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded w-full"
                      required
                    />

                    <label className="block font-medium">Image URL:</label>
                    <input
                      name="imageURL"
                      type="text"
                      value={imageURL}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded w-full"
                    />

                    <button
                      type="submit"
                      className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded"
                    >
                      Add Movie
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AddMovieModal;
