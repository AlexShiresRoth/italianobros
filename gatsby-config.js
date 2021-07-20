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
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-source-instagram-all`,
    {
      resolve: `gatsby-plugin-manifest`,
      // This path is relative to the root of the site.
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#CEB862`,
        theme_color: `#CEB862`,
        display: `minimal-ui`,
        icon: `src/images/Knife.png`,
      },
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
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token:
          "IGQVJWT3VQTlNOOVNPREljS0ppMnJBWTN1WTU5UHVPTTBJY0w5M0p5OFNRTnlvcDk1NDlSa2lzLXBpbVZAieFloTzc3aGgyYXBneU5HVEVDRXExWWVrZAWxQM1RqM0xPSGM5MXR0VURFVTdDcm45a3FDNAZDZD",
      },
    },
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // This type will contain remote schema Query type
    //     typeName: "instagram",
    //     // This is the field under which it's accessible
    //     fieldName: "insta",
    //     // URL to query from
    //     url:
    //       "https://graph.instagram.com/me&access_token=IGQVJXa2lKM2V3Ym84TlkxWFJqQUJncEFpOEVEcmd5dWNxZA1BxcFRhbE8wdW0wczFZAR1JKU1ZAMY29lRUd5eURwN1pxQkFUY0UtVTFRa0ktcE5PWUxNQUVzSWRDQ2VmTnhRRXRyWnJrR3BSQTVtSVFVcwZDZD",
    //   },
    // },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
