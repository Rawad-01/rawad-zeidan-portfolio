"use client";
import { useRef, useState, useEffect } from "react";
import { profile, type GalleryFilm } from "@/data/content";
import { Arrow } from "./Arrow";
export function FilmGallery({ films }: { films: GalleryFilm[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<(typeof films)[number] | null>(null);
  const [failed, setFailed] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!active) return;
    const modal = dialog.current;
    modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
  const close = () => {
    video.current?.pause();
    dialog.current?.close();
    setActive(null);
    setFailed(false);
    trigger.current?.focus();
  };
  return (
    <>
      <div className="film-grid">
        {films.map((film, index) => (
          <article className={`film film-${index + 1}`} key={film.id}>
            {film.available ? (
              <button
                className="film-poster"
                style={{ aspectRatio: `${film.width} / ${film.height}` }}
                aria-label={`Watch ${film.title}`}
                onClick={(event) => {
                  trigger.current = event.currentTarget;
                  setActive(film);
                }}
              >
                <FilmPoster film={film} />
              </button>
            ) : (
              <a
                className="film-poster"
                style={{ aspectRatio: `${film.width} / ${film.height}` }}
                href={`mailto:${profile.email}?subject=${encodeURIComponent(`Viewing request: ${film.title}`)}`}
                aria-label={`Request a viewing link for ${film.title}`}
              >
                <FilmPoster film={film} />
              </a>
            )}
            <div className="film-heading">
              <h3 dir="auto">{film.title}</h3>
              <span className="tiny-label">0{index + 1} / FILM</span>
            </div>
            {film.workingTitle && (
              <span className="working-title">Proposed working title</span>
            )}
            <p>{film.description}</p>
            <p className="film-credit">
              Original Concept, AI Video Generation & Editing — Rawad Zeidan
              <br />
              Generated with PixVerse AI.
            </p>
          </article>
        ))}
      </div>
      <dialog
        className="film-dialog"
        ref={dialog}
        aria-labelledby="film-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="film-dialog-inner">
          <div className="dialog-top">
            <h3 id="film-dialog-title" dir="auto">
              {active?.title}
            </h3>
            <button className="close-button" onClick={close} autoFocus>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          {active && (
            <video
              key={active.id}
              ref={video}
              controls
              playsInline
              preload="metadata"
              style={{ aspectRatio: `${active.width} / ${active.height}` }}
              poster={active.poster}
              onError={() => setFailed(true)}
            >
              <source
                src={active.src}
                type={
                  active.mime ??
                  (active.src.split("?")[0].endsWith(".webm")
                    ? "video/webm"
                    : "video/mp4")
                }
                onError={() => setFailed(true)}
              />
              {active.captions?.map((track, index) => (
                <track
                  key={track.src}
                  kind="captions"
                  src={track.src}
                  srcLang={track.language}
                  label={track.label}
                  default={index === 0}
                />
              ))}
            </video>
          )}
          {failed && (
            <p role="alert">
              The film could not load. Please try reopening it or contact Rawad.
            </p>
          )}
          <p className="dialog-credit">
            AI-generated with PixVerse AI. Concept, generation & editing: Rawad
            Zeidan.
          </p>
          {active?.transcript && (
            <a className="text-link" href={active.transcript}>
              Read the film transcript
            </a>
          )}
          {!active?.captions?.length && (
            <p className="caption-note">Captions are not yet available.</p>
          )}
          {!active?.transcript && (
            <p className="caption-note">A transcript is not yet available.</p>
          )}
        </div>
      </dialog>
    </>
  );
}

function FilmPoster({ film }: { film: GalleryFilm }) {
  return (
    <>
      <img
        src={film.poster}
        width={film.width}
        height={film.height}
        alt={film.posterAlt}
        loading="lazy"
      />
      <span className="film-topline">
        <span>AI-GENERATED FILM</span>
        <span>{film.duration}</span>
      </span>
      <span className="play-icon" aria-hidden="true">
        {film.available ? "\u25b6" : <Arrow diagonal />}
      </span>
      <span className="film-watch">
        {film.available ? "Watch film" : "Request viewing link"}
        <Arrow diagonal />
      </span>
    </>
  );
}
