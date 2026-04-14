import React, { useMemo } from "react";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { DataTableCard2, timeToString } from "asab_webui_components";
import { useNavigate } from "react-router";
import { cs } from "date-fns/locale/cs";
import { enUS } from "date-fns/locale/en-US";

const localeMap = { cs: cs, en: enUS };

function buildColumns(navigate, t, locale) {
  const clickWrap = (child, row) => (
    <p
      onClick={() => {
        const currentParams = new URLSearchParams(
          window.location.hash.split("?")[1] || ""
        );
        navigate(`/detail/${row.id}`, {
          state: { tableParams: currentParams.toString() },
        });
      }}
      className="m-0"
      style={{ cursor: "pointer" }}
    >
      {child}
    </p>
  );

  return [
    {
      title: t("TableScreen|username"),
      key: "username",
      render: ({ row }) =>
        clickWrap(
          <span className="custom-tooltip bg-transparent d-block border-0 h-100 m-0">
            <span className="d-block h-100">{row.username}</span>
            <span className="custom-tooltip__id">{row.id}</span>
          </span>,
          row
        ),
    },
    {
      title: t("TableScreen|email"),
      key: "email",
      render: ({ row }) => clickWrap(<span>{row.email}</span>, row),
    },
    {
      title: t("TableScreen|phone_number"),
      key: "phone_number",
      render: ({ row }) => clickWrap(<span>{row.phone_number}</span>, row),
    },
    {
      title: t("TableScreen|address"),
      key: "address",
      render: ({ row }) => clickWrap(<span>{row.address}</span>, row),
    },
    {
      title: t("TableScreen|created"),
      key: "created",
      render: ({ row }) =>
        clickWrap(timeToString(row.created, "long", locale), row),
    },
    {
      title: t("TableScreen|last_sign_in"),
      key: "last_sign_in",
      render: ({ row }) =>
        clickWrap(timeToString(row.last_sign_in, "long", locale), row),
    },
    {
      title: t("TableScreen|ip_address"),
      key: "ip_address",
      render: ({ row }) => clickWrap(<span>{row.ip_address}</span>, row),
    },
    {
      title: t("TableScreen|mac_address"),
      key: "mac_address",
      render: ({ row }) => clickWrap(<span>{row.mac_address}</span>, row),
    },
  ];
}

export function TableScreen(props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const locale = localeMap[i18n.language] || enUS;

  const columns = useMemo(
    () => buildColumns(navigate, t, locale),
    [i18n.language]
  );

  const ServiceAPI = props.app.axiosCreate("");

  const loader = async ({ params }) => {
    let response = await ServiceAPI.get("/data", { params: params });
    const rows = response.data.data;
    const count = response.data.count;
    return { count, rows };
  };

  return (
    <Container className="h-100">
      <DataTableCard2
        app={props.app}
        columns={columns}
        loader={loader}
        loaderParams=""
        header={null}
        rowHeight={50}
      />
    </Container>
  );
}
