import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { supabase } from "../client";

function AddCreator({ addCreatorToState }) {
  const navigate = useNavigate();

  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCreator((prevCreator) => ({
      ...prevCreator,
      [name]: value,
    }));
  };

  const createCreator = async (event) => {
    event.preventDefault();

    if (
      !creator.name.trim() ||
      !creator.url.trim() ||
      !creator.description.trim()
    ) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setSaving(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("creators")
      .insert({
        name: creator.name.trim(),
        url: creator.url.trim(),
        description: creator.description.trim(),
        imageURL: creator.imageURL.trim(),
      })
      .select()
      .single();

    if (error) {
      console.error(error);

      setErrorMessage("Unable to add creator right now. Please try again.");

      setSaving(false);
      return;
    }

    addCreatorToState(data);

    navigate("/");
  };

  return (
    <section className="form-page">
      <Link to="/" className="back-link">
        <FiArrowLeft />
        Back to Creators
      </Link>

      <article className="form-card card-surface">
        <header className="form-header">
          <h1>Add a Creator</h1>

          <p>Share your favorite content creators with the community.</p>
        </header>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={createCreator}>
          <label htmlFor="name">
            Creator Name
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Example: MrBeast"
              value={creator.name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="url">
            Social Media URL
            <input
              id="url"
              name="url"
              type="url"
              placeholder="Paste creator channel link"
              value={creator.url}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Tell people what kind of content this creator makes..."
              value={creator.description}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="imageURL">
            Profile Image URL
            <input
              id="imageURL"
              name="imageURL"
              type="url"
              placeholder="Optional profile image link"
              value={creator.imageURL}
              onChange={handleChange}
            />
          </label>

          <div className="form-actions">
            <button
              type="submit"
              className="app-button button-primary"
              disabled={saving}
            >
              <FiPlus />

              {saving ? "Adding Creator..." : "Add Creator"}
            </button>

            <Link to="/" className="app-button button-muted">
              Cancel
            </Link>
          </div>
        </form>
      </article>
    </section>
  );
}

export default AddCreator;
