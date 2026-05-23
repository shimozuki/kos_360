import AppLayout from '@/layouts/app-layout';

import {

    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,

} from 'recharts';

interface Props {

    totalKamar: number;

    totalPenyewa: number;

    totalBooking: number;

    bookingPending: number;

    chart: any[];

}

export default function Dashboard({

    totalKamar,

    totalPenyewa,

    totalBooking,

    bookingPending,

    chart,

}: Props) {

    return (
        

        <AppLayout>

            <div className="space-y-8 p-6">

                {/* Header */}
                <div>

                    <h1 className="text-3xl font-bold text-gray-800">

                        Dashboard Admin

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Monitoring sistem informasi kost.

                    </p>

                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

                    <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-xl">

                        <p className="text-sm opacity-80">
                            Total Kamar
                        </p>

                        <h2 className="mt-4 text-4xl font-bold">

                            {totalKamar}

                        </h2>

                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-xl">

                        <p className="text-sm opacity-80">
                            Penyewa
                        </p>

                        <h2 className="mt-4 text-4xl font-bold">

                            {totalPenyewa}

                        </h2>

                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-xl">

                        <p className="text-sm opacity-80">
                            Booking
                        </p>

                        <h2 className="mt-4 text-4xl font-bold">

                            {totalBooking}

                        </h2>

                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-red-500 to-red-600 p-6 text-white shadow-xl">

                        <p className="text-sm opacity-80">
                            Pending
                        </p>

                        <h2 className="mt-4 text-4xl font-bold">

                            {bookingPending}

                        </h2>

                    </div>

                </div>

                {/* Chart */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold text-gray-800">

                            Grafik Booking

                        </h2>

                        <p className="text-sm text-gray-500">

                            Statistik booking bulanan.

                        </p>

                    </div>

                    <div className="h-[350px] w-full">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart data={chart}>

                                <XAxis dataKey="bulan" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="total"
                                    radius={[12, 12, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </AppLayout>

    );
}