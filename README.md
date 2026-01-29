# ESC Geretsried

[![Netlify Status](https://api.netlify.com/api/v1/badges/04740fc4-a041-465c-bd32-10a933aa5097/deploy-status)](https://app.netlify.com/sites/esc-test/deploys)

## Getting Started 🚀

1. Create a `.env` file in the project root with the values from `.env.example`
2. Run `npm install`
3. Run `npm run dev` and visit http://localhost:8000

## Concepts

### Component Development

One component per file: https://stackoverflow.com/a/42996969
Emotion components in shared folder
UI Component Library

### Content Structure

CMS Page/Section philosophy!

#### Pages

Custom Pages with multiple data sources example

#### Sections

#### Blog Posts

### Routing

special routes:

- 404
- index
both receive special handling/create pages custom handling explained here (matchpath and / instead of index as routename)

### Data Fetching

Static vs. Dynamic content
Graphql intro,fragments, codegen explained

## Deployment

Same with netlify
Netlify deployment workflow

## CMS

Where can the cms project be found, where are the credentials

## Stack

## Available Commands

## Debugging

Debug possibilities

## Troubleshooting

- Gatsby clean
-...?

What services and how to run them?? @bytetyde ?

## Findings

### Node Version

***use node 18***

### Changes not showing

- npm run clean is your friend :-)

### error connecting to whatever when running **npm run dev**

- close the browser tab that sits on localhost:8000

### Updates

>WARNING: this AI suggestion does not work!!!!!

Based on your current configuration, here's the compatibility analysis and upgrade path:

#### Current State

- gatsby-source-wordpress: ^5.10.0
- WP Gatsby: 1.1.4
- WP GraphQL: 1.12.2
- WPGraphQL Smart Cache: 1.3.1

#### Compatibility Check

Your `gatsby-source-wordpress@5.x` requires:

- WPGraphQL: 1.5.0 - 1.14.x ✅ (1.12.2 is compatible)
- WP Gatsby: 1.0.0 - 2.x ✅ (1.1.4 is compatible)

#### Recommended Upgrades

WordPress Plugins (Safe Upgrades)

|Plugin|Current|Latest Compatible|Notes|
|-|-|-|-|
|WP GraphQL|1.12.2|1.14.x|Stay within 1.x for gatsby-source-wordpress@5|
|WP Gatsby|1.1.4|2.1.x|Compatible with gatsby-source-wordpress@5|
|WPGraphQL Smart Cache|1.3.1|1.4.x|Minor update available|

Steps to Upgrade

1) Backup WordPress before any plugin updates
1) Update WP GraphQL (1.12.2 → 1.14.x):
    - Go to WordPress Admin → Plugins
    - Update WPGraphQL to the latest 1.14.x version
    - Test GraphQL endpoint: `https://backend.esc-geretsried.de/graphql/`
1) Update WP Gatsby (1.1.4 → 2.1.x):
    - Update via WordPress Admin → Plugins
    - Clear WP Gatsby cache after update
1) Update WPGraphQL Smart Cache (1.3.1 → 1.4.x):
    - Update via WordPress Admin → Plugins
1) Test the build locally:

```sh
npm run clean
npm run build
```

#### Optional: Upgrade Gatsby (More Involved)

If you want to upgrade to Gatsby 4 or 5, you would need:

- WPGraphQL 1.14+
- WP Gatsby 2.0+
- Significant code changes (React 18, Node.js updates)

This is a larger migration and not required for stability.

#### Quick Verification Script

After updating WordPress plugins, verify the GraphQL endpoint works:

```sh
curl -X POST https://backend.esc-geretsried.de/graphql/ -H "Content-Type: application/json" -d "{\"query\": \"{ generalSettings { title } }\"}"
```

#### Summary

Yes, updates are possible and recommended:

- Update WP GraphQL to 1.14.x
- Update WP Gatsby to 2.1.x
- Update WPGraphQL Smart Cache to 1.4.x

These are safe, compatible updates that may also improve the timeout issues you were experiencing.
