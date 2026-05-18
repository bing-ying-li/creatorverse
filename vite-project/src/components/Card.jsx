import { useState } from "react";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiEye, FiEdit3, FiExternalLink } from "react-icons/fi";

function Card({ creator }) {
  const [expanded, setExpanded] = useState(false);

  const description = creator.description || "";
  const shouldShowReadMore = description.length > 160;

  return (
    <article className="creator-card card-surface hover-lift">
      <div className="creator-card-header">
        <div className="creator-avatar-wrapper">
          {creator.imageURL ? (
            <img
              src={creator.imageURL}
              alt={creator.name}
              className="avatar avatar-image"
            />
          ) : (
            <div className="avatar avatar-placeholder">
              <CgProfile />
            </div>
          )}

          <span className="youtube-badge">
            <FaYoutube />
          </span>
        </div>

        <h2 className="creator-name">{creator.name}</h2>
      </div>

      <div className="creator-card-body">
        <p
          className={
            expanded ? "creator-description expanded" : "creator-description"
          }
        >
          {description}
        </p>

        {shouldShowReadMore && (
          <button
            type="button"
            className="read-more-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </div>

      <footer className="card-actions icon-actions">
        <a
          href={creator.url}
          target="_blank"
          rel="noreferrer"
          className="icon-button button-youtube"
          aria-label="Visit creator page"
          data-label="Visit"
        >
          <FiExternalLink />
        </a>

        <Link
          to={`/creator/${creator.id}`}
          className="icon-button button-muted"
          aria-label="View creator details"
          data-label="Details"
        >
          <FiEye />
        </Link>

        <Link
          to={`/edit/${creator.id}`}
          className="icon-button button-primary"
          aria-label="Edit creator"
          data-label="Edit"
        >
          <FiEdit3 />
        </Link>
      </footer>
    </article>
  );
}

export default Card;
