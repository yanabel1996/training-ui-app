import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Container, Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { fetchFilm, fetchNames } from "../services/swapi";

export function FilmDetailScreen() {
  const { t } = useTranslation();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getFilm() {
      try {
        const data = await fetchFilm(id);
        setFilm(data);

        const [charNames, planetNames] = await Promise.all([
          fetchNames(data.characters.slice(0, 8)),
          fetchNames(data.planets),
        ]);
        setCharacters(charNames);
        setPlanets(planetNames);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getFilm();
  }, [id]);

  const loadAllCharacters = async () => {
    if (!film || showAll) return;
    setLoadingAll(true);
    try {
      const names = await fetchNames(film.characters.slice(8));
      setCharacters((prev) => [...prev, ...names]);
      setShowAll(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAll(false);
    }
  };

  if (loading) {
    return (
      <Container className="h-100 py-3 d-flex justify-content-center align-items-center">
        <Spinner />
      </Container>
    );
  }

  if (!film) {
    return (
      <Container className="h-100 py-3">
        <p>{t("FilmsScreen|No films found")}</p>
      </Container>
    );
  }

  return (
    <Container className="h-100 py-3">
      <button
        type="button"
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate("/films")}
      >
        <i className="bi bi-arrow-left me-2"></i>
        {t("FilmsScreen|Back to films")}
      </button>

      <Card className="shadow-sm mb-3">
        <CardHeader className="detail-card-header">
          <h2 className="mb-1">
            <i className="bi bi-film me-2"></i>
            {film.title}
          </h2>
          <p className="mb-0 opacity-75">
            {t("FilmsScreen|Episode")} {film.episode_id}
          </p>
        </CardHeader>
        <CardBody>
          <div className="detail-fields">
            <div className="detail-field-item">
              <strong>
                <i className="bi bi-camera-reels me-2"></i>
                {t("FilmsScreen|Director")}:
              </strong>{" "}
              {film.director}
            </div>
            <div className="detail-field-item">
              <strong>
                <i className="bi bi-person-workspace me-2"></i>
                {t("FilmsScreen|Producer")}:
              </strong>{" "}
              {film.producer}
            </div>
            <div className="detail-field-item">
              <strong>
                <i className="bi bi-calendar-event me-2"></i>
                {t("FilmsScreen|Release")}:
              </strong>{" "}
              {film.release_date}
            </div>
            <div className="detail-field-item">
              <strong>
                <i className="bi bi-globe me-2"></i>
                {t("FilmsScreen|Planets")}:
              </strong>{" "}
              {planets.join(", ")}
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="shadow-sm mb-3">
        <CardHeader>
          <h5 className="mb-0">
            <i className="bi bi-journal-text me-2"></i>
            {t("FilmsScreen|Opening crawl")}
          </h5>
        </CardHeader>
        <CardBody>
          <p className="mb-0">{film.opening_crawl}</p>
        </CardBody>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <h5 className="mb-0">
            <i className="bi bi-people me-2"></i>
            {t("FilmsScreen|Characters")}
          </h5>
        </CardHeader>
        <CardBody>
          <div className="d-flex flex-wrap gap-2">
            {characters.map((name, i) => (
              <span
                key={i}
                className="badge bg-light text-black fs-6 fw-normal"
              >
                {name}
              </span>
            ))}
            {!showAll && film.characters.length > 8 && (
              <span
                className="badge bg-primary fs-6 fw-normal"
                style={{ cursor: "pointer" }}
                onClick={loadAllCharacters}
              >
                {loadingAll ? (
                  <Spinner size="sm" />
                ) : (
                  <>+{film.characters.length - 8}</>
                )}
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
