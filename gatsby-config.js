const baseUrl = process.env.API_URL
const protocol = process.env.API_PROTOCOL
const sourceRegex = new RegExp( `(")(${protocol}:\\/\\/${baseUrl})(.+?)(\\\\?")`, 'gm')
const siteUrl = process.env.NODE_ENV === 'development' ? (process.env.SITE_URL || 'http://localhost:8000') : process.env.SITE_URL

module.exports = {
  siteMetadata: {
    title: `Terra Minds`,
    subtitle: `Nurturing creativity through science and nature`,
    siteUrl: siteUrl
  },
  plugins: [
    // https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
    /*
     * Gatsby's data processing layer begins with “source”
     * plugins. Here the site sources its data from Wordpress.
     */
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
        * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
        * Example : 'gatsbyjswpexample.wordpress.com' or 'www.example-site.com'
        */
        baseUrl: baseUrl,
        // The protocol. This can be http or https.
        protocol: protocol,
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the asumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: false,
        // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
        // This feature is untested for sites hosted on Wordpress.com
        useACF: true,
        searchAndReplaceContentUrls: {
          sourceUrl: sourceRegex,
          replacementUrl: function replacer(match, p1, p2, p3, p4, offset, string) {
            return p3.startsWith('/wp-content') ? match : p1 + p3 + p4;
          }
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-glamor`
  ],
}
