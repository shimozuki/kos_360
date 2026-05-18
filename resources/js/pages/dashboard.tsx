import AppLayout from '@/layouts/app-layout';

export default function UserDashboard() {
    return (
        <AppLayout>
            <div className="space-y-6 p-6">

                <div>
                    <h1 className="text-3xl font-bold">
                        Dashboard Penyewa
                    </h1>

                    <p className="text-gray-500">
                        Selamat datang di sistem informasi kost.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">
                            Total Pemesanan
                        </h2>

                        <p className="mt-4 text-3xl font-bold text-blue-600">
                            2
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">
                            Status Aktif
                        </h2>

                        <p className="mt-4 text-3xl font-bold text-green-600">
                            Aktif
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">
                            Tagihan
                        </h2>

                        <p className="mt-4 text-3xl font-bold text-red-600">
                            Rp 750K
                        </p>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
