import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
//import markdoc from '@astrojs/markdoc';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'CodeCMS',
        sidebar: [
            {
                label: 'CodeBlocks',
                items: [
                    // Each item here is one entry in the navigation menu.
                    //{ label: 'formfield', slug: 'blocks/formfields' },
                    { label: 'Hero', slug: 'blocks/hero' },
                    { label: 'Contact', slug: 'blocks/contact' },
                    { label: 'Facts', slug: 'blocks/facts' },
                    { label: 'FAQ', slug: 'blocks/faq' },
                    { label: 'Regulatory', slug: 'blocks/regulatory' },
                    { label: 'Timeline', slug: 'blocks/timeline' },
                    //{ label: 'Card', slug: 'blocks/card' },
                ],
            },
            //{
            //    label: 'Reference',
            //    autogenerate: { directory: 'reference' },
            //},
        ],
        customCss: [
            './src/assets/custom.css',
            './src/assets/prism-theme.css',
        ],
    }), mdx(), vue()],
});
