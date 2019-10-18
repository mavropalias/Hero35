declare const window: any;

export const GA_TRACKING_ID = "UA-749229-33";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  if (window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};
