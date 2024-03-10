import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'React Router',
  tagline: 'v6',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lcxfs1991', // Usually your GitHub org/user name.
  projectName: 'react-router-website', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            let docs = args.docs;
            args.docs =  args.docs.map((doc) => {
              if (doc.frontMatter.order) {
                doc.sidebarPosition = doc.frontMatter.order as number;
              }
              return doc;
            });
            // 将 sidebarItems 里 type = doc 的排到最前面，其他的排到后面
            let sidebarItems = await defaultSidebarItemsGenerator(args);
            sidebarItems = sidebarItems.sort((a, b) => {
              if (a.type === 'doc' && b.type !== 'doc') {
                return -1;
              }
              if (a.type !== 'doc' && b.type === 'doc') {
                return 1;
              }
              return 0;
            });

            return sidebarItems;
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'React Router',
      logo: {
        alt: 'React Router Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          href: 'https://react-router.docschina.org',
          label: 'v5文档',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '印记中文',
          items: [
            {
              label: '官网',
              to: 'https://docschina.org/',
            },
          ],
        },
        {
          title: '社区文档',
          items: [
            {
              label: 'React',
              href: 'https://react.docschina.org/',
            },
            {
              label: 'Webpack',
              href: 'https://webpack.docschina.org/',
            },
            {
              label: 'Rollup',
              href: 'https://rollup.docschina.org/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 印记中文.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
