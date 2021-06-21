module.exports = {
  siteMetadata: {
    title: `Italiano Bros. Enterprise`,
    description: `A forerunner in interior wall finishes, 
    and exterior stucco systems serving Montauk to Manhattan.`,
    keywords: `Nassau, Sullfok, East End, Specialty Wall 
    finishes, Stucco, Plaster, Venetian Plaster, Architectural Concrete, Dry Wall, Construction`,
    author: `@ASRproductions`,
    siteUrl: `https://www.italianobrosenterprise.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#CEB862`,
        theme_color: `#CEB862`,
        display: `minimal-ui`,
        icon: `src/images/Knife.png`,
      }, // This path is relative to the root of the site.
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/admin`, `/tags/links`],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-149441070-1`,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.italianobrosenterprise.com/",
        sitemap: "https://www.italianobrosenterprise.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
