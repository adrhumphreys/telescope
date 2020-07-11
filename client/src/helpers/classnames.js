import classNames from "classnames";

export const badgeFromLevel = (level) => {
  const logLevelClass = (level) => {
    level = level.toLowerCase();

    return {
      "bg-success": level === "debug",
      "bg-info": level === "info",
      "bg-secondary": level === "notice",
      "bg-warning": level === "warning",
      "bg-danger": ["error", "critical", "alert", "emergency"].includes(level),
    };
  };

  return classNames(
    "badge",
    "font-weight-light",
    "text-dark",
    logLevelClass(level)
  );
};
