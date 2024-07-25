import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function MetaComponent({ meta }: any) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{meta?.title}</title>
        {/* <meta name="description" content={meta?.description} /> */}
      </Helmet>
    </HelmetProvider>
  );
}
