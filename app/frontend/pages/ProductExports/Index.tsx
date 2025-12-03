import MainLayout from '@/layouts/MainLayout'
import { Head, Link, router } from '@inertiajs/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

interface ProductExport {
    product_id: number
    sku: string
    name: string
    price_cents: number
    category_slug: string
    exported_at: string
}

export default function Index({ product_exports }: { product_exports: ProductExport[] }) {
    const handlePurge = () => {
        if (confirm("Are you sure you want to delete all product exports?")) {
            router.delete('/product_exports/purge')
        }
    }

    return (
        <MainLayout>
            <Head title="Product Exports" />

            <div className="mb-6">
                <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">← Back to Home</Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-8">📄 Product Exports</h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-medium">View Products</Link>
                <span className="text-gray-400">|</span>
                <Link href="/active_data_flow/data_flows" className="text-indigo-600 hover:text-indigo-700 font-medium">View DataFlow</Link>
                <span className="text-gray-400">|</span>
                <Link href="/data_flow" className="text-indigo-600 hover:text-indigo-700 font-medium">Trigger Heartbeat</Link>
                <span className="text-gray-400">|</span>
                <button onClick={handlePurge} className="text-red-600 hover:text-red-700 font-semibold bg-transparent border-0 p-0 cursor-pointer">
                    🗑️ Purge All
                </button>
            </div>

            {product_exports.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead>Product ID</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price (cents)</TableHead>
                                <TableHead>Category Slug</TableHead>
                                <TableHead>Exported At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product_exports.map((exportItem) => (
                                <TableRow key={`${exportItem.product_id}-${exportItem.exported_at}`} className="hover:bg-gray-50">
                                    <TableCell>{exportItem.product_id}</TableCell>
                                    <TableCell>{exportItem.sku}</TableCell>
                                    <TableCell>{exportItem.name}</TableCell>
                                    <TableCell>{exportItem.price_cents}</TableCell>
                                    <TableCell>{exportItem.category_slug}</TableCell>
                                    <TableCell>{new Date(exportItem.exported_at).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
                    <div className="text-gray-400 text-6xl mb-4">📦</div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">No exports yet</h2>
                    <p className="text-gray-600 mb-6">
                        Trigger the DataFlow to sync products.
                    </p>
                    <Link href="/data_flow">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Trigger Heartbeat</Button>
                    </Link>
                </div>
            )}
        </MainLayout>
    )
}
