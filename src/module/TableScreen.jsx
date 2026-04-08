import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { DataTableCard2, DateTime } from "asab_webui_components";
import { TableHeader } from "./TableHeader";
import { useNavigate } from "react-router";

function setCols(data, navigate) {
  const cols = [];

  const clickWrap = (child, row) => (
    <p
      onClick={() => navigate(`/detail/${row.id}`)}
      className="m-0"
      style={{ cursor: "pointer" }}
    >
      {child}
    </p>
  );

  for (let col in data) {
    if (col !== "id") {
      const column = {
        title: col,
      };

      if (col === "username") {
        column.render = ({ row }) =>
          clickWrap(
            <span className="custom-tooltip bg-transparent d-block border-0 h-100 m-0">
              <span className="d-block h-100">{row[column.title]}</span>
              <span className="custom-tooltip__id">{row.id}</span>
            </span>,
            row
          );
      } else if (col === "created" || col === "last_sign_in") {
        column.render = ({ row }) =>
          clickWrap(<DateTime value={row[column.title]} />, row);
      } else {
        column.render = ({ row }) =>
          clickWrap(<span>{row[column.title]}</span>, row);
      }
      cols.push(column);
    }
  }
  return cols;
}

export function TableScreen(props) {
  const { t } = useTranslation();
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  const ServiceAPI = props.app.axiosCreate("");
  const loaderParams = "";

  const loader = async ({ params }) => {
    let response = await ServiceAPI.get("/data", { params: params });
    const rows = response.data.data;
    const count = response.data.count;
    return { count, rows };
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://devtest.teskalabs.com/data");
        if (!res.ok) {
          throw new Error("Something went bad");
        }
        const { data } = await res.json();
        const cols = setCols(data[0], navigate);
        setColumns(cols);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [setColumns]);

  return (
    <Container className="h-100">
      <DataTableCard2
        app={app}
        columns={columns}
        loader={loader}
        loaderParams={loaderParams}
        header={<TableHeader />}
        rowHeight={50}
      />
    </Container>
  );
}
