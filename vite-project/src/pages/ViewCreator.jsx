import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FaYoutube } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { FiArrowLeft, FiEdit3, FiExternalLink } from "react-icons/fi";

import { supabase } from "../client";

function ViewCreator() {
  const { id } = useParams();

  const [creator, setCreator] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);

        setCreator(null);
      } else {
        setCreator(data);
      }

      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) {
    return (
      <section className="creator-detail-page">
        <article className="detail-card card-surface">
          <p>Loading creator profile...</p>
        </article>
      </section>
    );
  }

  if (!creator) {
    return (
      <section className="creator-detail-page">
        <article className="empty-state card-surface">
          <h1>Creator Not Found</h1>

          <p>This creator may have been removed or no longer exists.</p>

          <Link to="/" className="app-button button-primary">
            Back to Creatorverse
          </Link>
        </article>
      </section>
    );
  }

  return (
    <section className="creator-detail-page">
      <Link to="/" className="back-link">
        <FiArrowLeft />
        Back to Creatorverse
      </Link>

      <article className="detail-card card-surface">
        <div className="detail-avatar-wrapper">
          {creator.imageURL ? (
            <img
              src={creator.imageURL}
              alt={creator.name}
              className="avatar avatar-image avatar-large"
              onError={(event) => {
                event.target.style.display = "none";
              }}
            />
          ) : (
            <div className="avatar avatar-placeholder avatar-large">
              <CgProfile />
            </div>
          )}

          <span className="youtube-badge">
            <FaYoutube />
          </span>
        </div>

        <div className="detail-content">
          <h1>{creator.name}</h1>

          <p className="detail-description">
            {creator.description || "No description has been added yet."}
          </p>

          <div className="detail-actions">
            <a
              href={creator.url}
              target="_blank"
              rel="noreferrer"
              className="app-button button-youtube"
            >
              <FiExternalLink />
              Visit Channel
            </a>

            <Link
              to={`/edit/${creator.id}`}
              className="app-button button-primary"
            >
              <FiEdit3 />
              Edit Creator
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ViewCreator;
