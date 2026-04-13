import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { timeToString } from "asab_webui_components";
import { cs } from "date-fns/locale/cs";

// TODO: translations

const cardFields = (t) => {
  return {
    phone_number: {
      icon: "bi-telephone",
      text: "Phone number:",
    },
    address: {
      icon: "bi-geo",
      text: "Address:",
    },
    ip_address: {
      icon: "bi-globe",
      text: "IP address:",
    },
    mac_address: {
      icon: "bi-pc-display-horizontal",
      text: "Mac address:",
    },
    created: {
      icon: "bi-calendar-date",
      text: "Created",
    },
    last_sign_in: {
      icon: "bi-stopwatch",
      text: "Last sign in",
    },
  };
};

export function DetailScreen(props) {
  const { t } = useTranslation();
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`https://devtest.teskalabs.com/detail/${id}`);
        if (!res.ok) {
          throw new Error("Something went bad");
        }
        const data = await res.json();
        setInfo(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [setInfo]);
  return (
    <Container className="h-100">
      <Card>
        <CardHeader>
          <h2>{info.username}</h2>
          <p>{info.email}</p>
        </CardHeader>
        <CardBody>
          <ul className="p-0 list-unstyled">
            {Object.keys(info).map((field, i) => {
              const objField = cardFields(t)[field];
              if (!objField) return;
              console.log(objField);
              return (
                <li key={i}>
                  <strong>
                    <i class={`bi ${objField.icon} me-2`}></i>
                    {objField.text}
                  </strong>{" "}
                  {field === "created" || field === "last_sign_in"
                    ? timeToString(info[field], "long", cs)
                    : info[field]}
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
      {/* {t("Training|Hello, there is nothing here yet!")} */}
    </Container>
  );
}
