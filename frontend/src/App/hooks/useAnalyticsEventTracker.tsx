import ReactGA4 from 'react-ga4';

export const useAnalyticsEventTracker = (category: string) => {
  return (action: string, label: string) =>
    ReactGA4.event({
      category,
      action,
      label,
    });
}

