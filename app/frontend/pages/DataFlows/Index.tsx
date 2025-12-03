import MainLayout from '@/layouts/MainLayout'
import { Head, Link, router } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface DataFlow {
    id: string
    name: string
    status: string
    source: {
        model_class: string
        scope_name?: string
        batch_size?: number
    }
    sink: {
        model_class: string
    }
    last_run_at?: string
    last_error?: string
}

export default function Index({ data_flows }: { data_flows: DataFlow[] }) {
    const toggleStatus = (id: string, currentStatus: string) => {
        router.patch(`/active_data_flow/data_flows/${id}/toggle_status`)
    }

    const getStatusVariant = (status: string) => {
        return status === 'active' ? 'default' : 'secondary'
    }

    return (
        <MainLayout>
            <Head title="Data Flows" />

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">⚡ Data Flows</h1>
                <Link href="/">
                    <Button variant="outline">← Back to Home</Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                {data_flows && data_flows.length > 0 ? (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Active Data Flows ({data_flows.length})
                        </h2>

                        <div className="space-y-4">
                            {data_flows.map((dataFlow) => (
                                <Card key={dataFlow.id} className="border-l-4 border-l-purple-600 hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle>{dataFlow.name}</CardTitle>
                                            <Badge variant={getStatusVariant(dataFlow.status)}>
                                                {dataFlow.status.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                                            <p>
                                                <span className="font-medium text-gray-900">Source:</span>{' '}
                                                {dataFlow.source.model_class}
                                                {dataFlow.source.scope_name && ` (${dataFlow.source.scope_name})`}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-900">Sink:</span>{' '}
                                                {dataFlow.sink.model_class}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-900">Batch Size:</span>{' '}
                                                {dataFlow.source.batch_size || 100}
                                            </p>
                                            {dataFlow.last_run_at && (
                                                <p>
                                                    <span className="font-medium text-gray-900">Last Run:</span>{' '}
                                                    {new Date(dataFlow.last_run_at).toLocaleString()}
                                                </p>
                                            )}
                                            {dataFlow.last_error && (
                                                <p className="text-red-600">
                                                    <span className="font-medium">Last Error:</span> {dataFlow.last_error}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <Link href={`/active_data_flow/data_flows/${dataFlow.id}`}>
                                                <Button>View Details</Button>
                                            </Link>
                                            <Link href={`/active_data_flow/data_flows/${dataFlow.id}/data_flow_runs`}>
                                                <Button variant="outline">View Runs</Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                onClick={() => toggleStatus(dataFlow.id, dataFlow.status)}
                                            >
                                                {dataFlow.status === 'active' ? 'Deactivate' : 'Activate'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-6xl mb-4">⚡</div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Data Flows Found</h2>
                        <p className="text-gray-600 mb-2">No data flows have been registered yet.</p>
                        <p className="text-gray-500 text-sm">
                            Data flows are defined in code (e.g., app/data_flows/). Once defined, they will appear here.
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}
