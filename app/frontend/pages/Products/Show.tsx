import MainLayout from '@/layouts/MainLayout'
import { Head, Link } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Product {
    id: number
    sku: string
    name: string
    price: string
    category: string
    active: boolean
}

export default function Show({ product }: { product: Product }) {
    return (
        <MainLayout>
            <Head title={`Product ${product.sku}`} />

            <div className="mb-6">
                <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-medium">← Back to Products</Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">Product Details</h1>

            <Card>
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <dt className="font-semibold text-gray-700">SKU:</dt>
                            <dd className="mt-1 text-gray-900">{product.sku}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-700">Price:</dt>
                            <dd className="mt-1 text-gray-900">${Number(product.price).toFixed(2)}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-700">Category:</dt>
                            <dd className="mt-1 text-gray-900">{product.category}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-700">Active:</dt>
                            <dd className="mt-1">
                                <Badge variant={product.active ? "default" : "secondary"} className={product.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                    {product.active ? 'Yes' : 'No'}
                                </Badge>
                            </dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>
        </MainLayout>
    )
}
