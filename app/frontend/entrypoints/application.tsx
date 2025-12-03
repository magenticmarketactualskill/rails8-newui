import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import './application.css'

const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })

createInertiaApp({
    resolve: (name) => {
        const page = pages[`../pages/${name}.tsx`]
        return page.default
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})
