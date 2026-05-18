import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import Card from "../components/Card";

function ShowCreators({ creators = [] }) {
  const creatorCount = creators.length;

  return (
    <section className="show-creators-page">
      <header className="page-header">
        <div>
          <h1>Creatorverse</h1>

          <p>
            Discover and share amazing content creators from across the
            internet.
          </p>

          <p className="creator-count">
            {creatorCount} {creatorCount === 1 ? "creator" : "creators"} in the
            collection
          </p>
        </div>

        <Link to="/new" className="app-button button-primary">
          <FiPlus />
          Add Creator
        </Link>
      </header>

      {creatorCount === 0 ? (
        <article className="empty-state card-surface">
          <h2>No creators added yet</h2>

          <p>
            Start building your Creatorverse by adding your favorite creator.
          </p>

          <Link to="/new" className="app-button button-primary">
            <FiPlus />
            Add Your First Creator
          </Link>
        </article>
      ) : (
        <div className="creator-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ShowCreators;
