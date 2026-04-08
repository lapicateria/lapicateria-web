"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GA_ID } from "@/lib/analytics";
import {
  COOKIE_CONSENT_EVENT,
  hasAnalyticsConsent,
  readStoredConsent,
} from "@/lib/cookies";

export function GoogleAnalytics() {
  const [canLoadAnalytics, setCanLoadAnalytics] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const updateConsent = () => {
      const consent = readStoredConsent();
      setCanLoadAnalytics(hasAnalyticsConsent(consent));
    };

    updateConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, updateConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, updateConsent);
    };
  }, []);

  if (process.env.NODE_ENV !== "production" || !GA_ID || !canLoadAnalytics) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
