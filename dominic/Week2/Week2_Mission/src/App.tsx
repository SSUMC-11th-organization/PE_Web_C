import { type CSSProperties, useMemo, useState } from 'react';
import MovieCard from './components/MovieCard';
import { movies as initialMovies } from './data/movies';
import type { Movie } from './types/movie';
import './App.css';

type MovieFilter = 'all' | 'bookmarked';

export default function App() {
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies);
  const [activeFilter, setActiveFilter] = useState<MovieFilter>('all');
  const [activeGenre, setActiveGenre] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const genres = useMemo(
    () => ['전체', ...new Set(movieList.flatMap((movie) => movie.genres))],
    [movieList],
  );
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const visibleMovies = movieList.filter((movie) => {
    const matchesBookmark = activeFilter === 'all' || movie.isBookmarked;
    const matchesGenre = activeGenre === '전체' || movie.genres.includes(activeGenre);
    const matchesSearch = `${movie.title} ${movie.originalTitle}`
      .toLocaleLowerCase()
      .includes(normalizedQuery);
    return matchesBookmark && matchesGenre && matchesSearch;
  });
  const bookmarkedCount = movieList.filter((movie) => movie.isBookmarked).length;
  const featuredMovie = movieList[0];
  const heroStyle = {
    '--hero-backdrop': `url("${featuredMovie.backdropPath}")`,
  } as CSSProperties;

  function handleToggleBookmark(movieId: number) {
    setMovieList((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId ? { ...movie, isBookmarked: !movie.isBookmarked } : movie,
      ),
    );
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="UMCine 홈">
          <span className="brand__mark" aria-hidden="true">
            <span />
          </span>
          <span>umcine</span>
        </a>
        <nav className="primary-nav" aria-label="주요 메뉴">
          <a className="primary-nav__link is-active" href="#movie-list">
            발견
          </a>
          <a className="primary-nav__link" href="#movie-list">
            영화
          </a>
          <button
            className={`primary-nav__link${activeFilter === 'bookmarked' ? ' is-active' : ''}`}
            type="button"
            onClick={() =>
              setActiveFilter((current) => (current === 'bookmarked' ? 'all' : 'bookmarked'))
            }
          >
            보관함 <span className="nav-count">{bookmarkedCount}</span>
          </button>
        </nav>
        <label className="search-box">
          <img src="/icons/search.svg" alt="" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="영화 검색"
            aria-label="영화 검색"
          />
        </label>
      </header>

      <main id="top">
        <section className="hero" style={heroStyle} aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="eyebrow">
              <span /> UMCINE PICK · 이번 주의 추천
            </p>
            <h1 id="hero-title">{featuredMovie.title}</h1>
            <p className="hero__original-title">
              {featuredMovie.originalTitle}
              <span>{featuredMovie.releaseDate}</span>
            </p>
            <p className="hero__tagline">{featuredMovie.tagline}</p>
            <p className="hero__overview">{featuredMovie.overview}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#movie-list">
                <img src="/icons/movie.svg" alt="" /> 영화 둘러보기
              </a>
              <button
                className={`button button--secondary${featuredMovie.isBookmarked ? ' is-bookmarked' : ''}`}
                type="button"
                aria-pressed={featuredMovie.isBookmarked}
                onClick={() => handleToggleBookmark(featuredMovie.id)}
              >
                <img
                  src={
                    featuredMovie.isBookmarked
                      ? '/icons/bookmark.svg'
                      : '/icons/bookmark-outline.svg'
                  }
                  alt=""
                />
                {featuredMovie.isBookmarked ? '보관함에 저장됨' : '보관함에 저장'}
              </button>
            </div>
          </div>
          <span className="hero__index">
            01 <i /> 10
          </span>
        </section>

        <section className="movie-section" id="movie-list">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR NEXT FAVORITE</p>
              <h2>지금, 보고 싶은 영화</h2>
              <p className="section-heading__description">취향에 꼭 맞는 다음 영화를 찾아보세요.</p>
            </div>
            <div className="view-count">
              <img src="/icons/movie.svg" alt="" /> <span>{visibleMovies.length}편의 영화</span>
            </div>
          </div>

          <div className="filter-toolbar">
            <fieldset className="filter-tabs" aria-label="영화 보기">
              <legend className="visually-hidden">영화 보기</legend>
              <button
                className={activeFilter === 'all' ? 'is-selected' : ''}
                type="button"
                aria-pressed={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
              >
                전체 영화
              </button>
              <button
                className={activeFilter === 'bookmarked' ? 'is-selected' : ''}
                type="button"
                aria-pressed={activeFilter === 'bookmarked'}
                onClick={() => setActiveFilter('bookmarked')}
              >
                <img src="/icons/bookmark-outline.svg" alt="" /> 내 보관함{' '}
                <span>{bookmarkedCount}</span>
              </button>
            </fieldset>
            <label className="genre-select">
              <span>장르</span>
              <select
                value={activeGenre}
                onChange={(event) => setActiveGenre(event.target.value)}
                aria-label="장르 필터"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <img src="/icons/arrow-right.svg" alt="" />
            </label>
          </div>

          {visibleMovies.length > 0 ? (
            <div className="movie-grid">
              {visibleMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onToggleBookmark={handleToggleBookmark} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <img src="/icons/movie.svg" alt="" />
              <h3>조건에 맞는 영화가 없어요</h3>
              <p>검색어나 필터를 바꿔 다시 찾아보세요.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveGenre('전체');
                  setActiveFilter('all');
                }}
              >
                필터 초기화
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand--footer" href="#top">
          <span className="brand__mark" aria-hidden="true">
            <span />
          </span>
          <span>umcine</span>
        </a>
        <p>좋아하는 영화가 쌓이는 곳.</p>
        <div className="attribution">
          <span>영화 이미지 제공</span>
          <img src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        </div>
      </footer>
    </div>
  );
}
