import { ReportHandler, Metric } from "web-vitals";

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry as (metric: Metric) => void);
      getFID(onPerfEntry as (metric: Metric) => void);
      getFCP(onPerfEntry as (metric: Metric) => void);
      getLCP(onPerfEntry as (metric: Metric) => void);
      getTTFB(onPerfEntry as (metric: Metric) => void);
    });
  }
};

export default reportWebVitals;
