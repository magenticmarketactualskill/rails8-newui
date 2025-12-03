import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import './application.css'

const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })

console.log('All available pages:', Object.keys(pages))

createInertiaApp({
    resolve: (name) => {
        console.log('Resolving:', name)
        const pagePath = `../pages/${name}.tsx`
        console.log('Looking for:', pagePath)
        const page = pages[pagePath]
        console.log('Found page module:', page)
        if (!page) {
            throw new Error(`Page not found: ${name}. Available: ${Object.keys(pages).join(', ')}`)
        }
        return page.default
    },
    setup({ el, App, props }) {
        console.log('Setting up with el:', el)
        createRoot(el).render(<App {...props} />)
    },
})
