import { Link, usePage } from '@inertiajs/react'
import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

export default function MainLayout({ children }: { children: ReactNode }) {
    const page = usePage()
    const { flash } = page.props as any
    const url = page.url

    const isActive = (path: string) => url.startsWith(path)

    return (
        <div className="bg-gray-50 text-gray-900 font-sans antialiased flex flex-col min-h-screen">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                            <span className="text-2xl">⚡</span>
                            <span>Rails8 Demo</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
                            <Link
                                href="/products"
                                className={`hover:text-indigo-600 transition-colors ${isActive('/products') ? 'text-indigo-600' : ''}`}
                            >
                                Products
                            </Link>
                            <Link
                                href="/product_exports"
                                className={`hover:text-indigo-600 transition-colors ${isActive('/product_exports') ? 'text-indigo-600' : ''}`}
                            >
                                Exports
                            </Link>
                            <Link
                                href="/active_data_flow/data_flows"
                                className={`hover:text-indigo-600 transition-colors ${isActive('/active_data_flow') ? 'text-indigo-600' : ''}`}
                            >
                                DataFlows
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/heartbeat_click" method="post" as="button">
                            <Button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                                <span>Trigger Heartbeat</span>
                                <span className="text-indigo-200">💓</span>
                            </Button>
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {flash.notice && (
                    <div className="mb-8 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
                        {flash.notice}
                    </div>
                )}
                {flash.alert && (
                    <div className="mb-8 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
                        {flash.alert}
                    </div>
                )}

                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} ActiveDataFlow Rails 8 Demo. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href="https://github.com/active_data_flow/active_data_flow" target="_blank" className="hover:text-indigo-600 transition-colors">GitHub</a>
                            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
