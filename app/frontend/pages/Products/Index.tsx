import MainLayout from '@/layouts/MainLayout'
import { Head, Link } from '@inertiajs/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface Product {
    id: number
    sku: string
    name: string
    price: string
    category: string
    active: boolean
}

export default function Index({ products }: { products: Product[] }) {
    return (
        <MainLayout>
            <Head title="Products" />

            <div className="mb-6">
                <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">← Back to Home</Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-8">📦 Products</h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                <Link href="/product_exports" className="text-indigo-600 hover:text-indigo-700 font-medium">View Product Exports</Link>
                <span className="text-gray-400">|</span>
                <Link href="/active_data_flow/data_flows" className="text-indigo-600 hover:text-indigo-700 font-medium">View DataFlow</Link>
                <span className="text-gray-400">|</span>
                <Link href="/heartbeat_click" method="post" as="button" className="text-indigo-600 hover:text-indigo-700 font-medium">Trigger Heartbeat</Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Active</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} className="hover:bg-gray-50">
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>
                                    <Badge variant={product.active ? "default" : "secondary"} className={product.active ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}>
                                        {product.active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </MainLayout>
    )
}
