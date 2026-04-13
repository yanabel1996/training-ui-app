import React from "react";
import { useTranslation } from "react-i18next";

// TODO: change table header + translations
export const TableHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex-fill">
        <h3>
          <i className="bi bi-stopwatch pe-2"></i>
          {t("SessionListContainer|Sessions")}
        </h3>
      </div>
      <button type="button" className="btn btn-danger">
        Terminate all
      </button>
    </>
  );
};
