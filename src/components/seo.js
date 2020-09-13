import React from "react"
import { Helmet } from "react-helmet"

function Seo(props) {
  const title = "Pemalang Notebook" + (props.title ? " - " + props.title : "")

  return (
    <Helmet>
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Seller",
          "url": "https://www.pemalangnotebook.com",
          "name": "${title}",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+6282136950725",
            "contactType": "Customer Support"
          }
        }
      `}
      </script>
      <title>{title}</title>
      <meta
        name="description"
        content={props.description || "Pemalang Notebook"}
      />
      <meta name="keywords" content={props.keywords || "Pemalang Notebook"} />
      <link rel="canonical" href="https://pemalangnotebook.com" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/public/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/public/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/public/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/public/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}

export default Seo
