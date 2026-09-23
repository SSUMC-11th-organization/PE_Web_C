import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
          loading="lazy"
        />
        <div className="movie-card__overlay">
          <p>{movie.tagline}</p>
          <span>{movie.overview}</span>
        </div>
        <button
          className={`bookmark-button${movie.isBookmarked ? ' is-bookmarked' : ''}`}
          type="button"
          aria-label={`${movie.isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}: ${movie.title}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            src={movie.isBookmarked ? '/icons/bookmark.svg' : '/icons/bookmark-outline.svg'}
            alt=""
          />
        </button>
        <span className="movie-card__runtime">{movie.runtime}</span>
      </div>
      <div className="movie-card__info">
        <div className="movie-card__heading">
          <h3>{movie.title}</h3>
          <span className="movie-card__release">{movie.releaseDate}</span>
        </div>
        <p className="movie-card__original-title">{movie.originalTitle}</p>
        <ul className="movie-card__genres" aria-label="장르">
          {movie.genres.slice(0, 2).map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
