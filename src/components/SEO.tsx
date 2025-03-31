import Head from 'next/head';

type SEOProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
}

const SEO = ({
  title = "Haetae - The best place to find your next place",
  description = "Discover available accommodations near Keimyung University.",
  ogImage = "/Haetae-logo.png",
  ogUrl = "https://haetaedaegu.vercel.app/",
  twitterCard = "summary_large_image"
}: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
};

export default SEO; 