import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useLocation } from "react-router";
import { timeToString } from "asab_webui_components";
import { fetchDetailData } from "../services/teskalabs";
import { cs } from "date-fns/locale/cs";
import { enUS } from "date-fns/locale/en-US";

const localeMap = { cs: cs, en: enUS };

const cardFields = (t) => ({
  phone_number: {
    icon: "bi-telephone",
    text: t("DetailScreen|Phone number"),
  },
  address: {
    icon: "bi-geo",
    text: t("DetailScreen|Address"),
  },
  ip_address: {
    icon: "bi-globe",
    text: t("DetailScreen|IP address"),
  },
  mac_address: {
    icon: "bi-pc-display-horizontal",
    text: t("DetailScreen|MAC address"),
  },
  created: {
    icon: "bi-calendar-date",
    text: t("DetailScreen|Created"),
  },
  last_sign_in: {
    icon: "bi-stopwatch",
    text: t("DetailScreen|Last sign in"),
  },
});

export function DetailScreen() {
  const { t, i18n } = useTranslation();
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const tableParams = location.state?.tableParams || "";
  const locale = localeMap[i18n.language] || enUS;

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchDetailData(id);
        setInfo(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id]);

  const handleBack = () => {
    navigate(tableParams ? `/?${tableParams}` : "/");
  };

  return (
    <Container className="h-100 py-3">
      <button
        type="button"
        className="btn btn-outline-secondary mb-3"
        onClick={handleBack}
      >
        <i className="bi bi-arrow-left me-2"></i>
        {t("DetailScreen|Back to table")}
      </button>

      <Card className="shadow-sm">
        <CardHeader className="detail-card-header">
          <div>
            <h2 className="mb-1">
              <i className="bi bi-person-circle me-2"></i>
              {info.username}
            </h2>
            <p className="mb-0 opacity-75">
              <i className="bi bi-envelope me-2"></i>
              {info.email}
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <ul className="p-0 list-unstyled detail-fields">
            {Object.keys(info).map((field, i) => {
              const objField = cardFields(t)[field];
              if (!objField) return null;
              return (
                <li key={i} className="detail-field-item">
                  <strong>
                    <i className={`bi ${objField.icon} me-2`}></i>
                    {objField.text}:
                  </strong>{" "}
                  {field === "created" || field === "last_sign_in"
                    ? timeToString(info[field], "long", locale)
                    : info[field]}
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
    </Container>
  );
}
