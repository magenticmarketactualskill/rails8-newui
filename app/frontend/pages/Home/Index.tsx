import MainLayout from '@/layouts/MainLayout'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface HomeProps {
    productCount: number
    activeProductCount: number
    inactiveProductCount: number
    exportCount: number
    lastExport: any
}

export default function Index({ productCount, activeProductCount, inactiveProductCount, exportCount, lastExport }: HomeProps) {
    return (
        <MainLayout>
            <Head title="Home" />

            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Rails 8 + Inertia + React
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    A modern stack demonstration using Rails 8, Inertia.js v2, React, and Shadcn UI.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>📦</span> Products
                        </CardTitle>
                        <CardDescription>
                            Manage and view your product inventory.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Total Products:</span>
                                <span className="font-medium">{productCount}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Active:</span>
                                <span className="font-medium text-green-600">{activeProductCount}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Inactive:</span>
                                <span className="font-medium text-gray-600">{inactiveProductCount}</span>
                            </div>
                        </div>
                        <Link href="/products">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                View Products
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>📄</span> Exports
                        </CardTitle>
                        <CardDescription>
                            Track product export history and status.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Total Exports:</span>
                                <span className="font-medium">{exportCount}</span>
                            </div>
                            {lastExport && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Last Export:</span>
                                    <span className="font-medium">{new Date(lastExport.exported_at).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>
                        <Link href="/product_exports">
                            <Button variant="outline" className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                                View Exports
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}
