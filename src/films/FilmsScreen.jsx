import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { fetchFilms } from "../services/swapi";

export function FilmsScreen() {
  const { t } = useTranslation();
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getFilms() {
      try {
        const data = await fetchFilms();
        setFilms(data);
      } catch (error) {
        console.log(error);
      }
    }
    getFilms();
  }, []);

  return (
    <Container className="h-100 py-3">
      <h3 className="mb-3">
        <i className="bi bi-film me-2"></i>
        {t("FilmsScreen|Films")}
      </h3>
      {films.length === 0 ? (
        <p>{t("FilmsScreen|No films found")}</p>
      ) : (
        <div className="films-grid">
          {films.map((film) => (
            <Card
              className="film-card shadow-sm"
              key={film.episode_id}
              onClick={() => navigate(`/films/${film.episode_id}`)}
              style={{ cursor: "pointer" }}
            >
              <CardHeader className="film-card-header">
                <h5 className="mb-0">{film.title}</h5>
              </CardHeader>
              <CardBody>
                <p className="film-crawl">{film.opening_crawl}</p>
                <div className="film-meta">
                  <span>
                    <i className="bi bi-calendar-event me-1"></i>
                    {t("FilmsScreen|Release")}: {film.release_date}
                  </span>
                  <span>
                    <i className="bi bi-camera-reels me-1"></i>
                    {t("FilmsScreen|Director")}: {film.director}
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
