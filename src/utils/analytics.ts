import ReactGA from "react-ga4";

export const trackEvent = (category: string, action: string, label: string) => {
  if (import.meta.env.PROD) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
