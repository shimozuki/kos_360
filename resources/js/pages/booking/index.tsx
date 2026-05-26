import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, router } from '@inertiajs/react';

interface Booking {
    id: number;
    tanggal_masuk: string;
    durasi: number;
    status: string;

    kamar: {
        id: number;
        nama_kamar: string;
        harga: number;
        thumbnail: string;
    };
}

interface PaginatedBookings {
    data: Booking[];
    links: any[];
}

interface Props {
    bookings: PaginatedBookings;
}

export default function BookingIndex({
    bookings,
}: Props) {

    return (

        <GuestLayout>

            <Head title="Booking Saya" />

            <div className="min-h-screen bg-gray-50 py-16">

                <div className="mx-auto max-w-7xl px-6">

                    {/* HEADER */}
                    <div className="mb-12">

                        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-600">
                            Penyewaan Kamar
                        </span>

                        <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-gray-900">
                            Booking Saya
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-gray-500">
                            Semua riwayat booking kamar kost anda tersimpan di sini.
                        </p>

                    </div>

                    {/* EMPTY STATE */}
                    {bookings.length === 0 && (

                        <div className="rounded-[32px] bg-white p-16 text-center shadow-sm">

                            <h2 className="text-3xl font-bold text-gray-900">
                                Belum Ada Booking
                            </h2>

                            <p className="mt-4 text-gray-500">
                                Anda belum melakukan booking kamar.
                            </p>

                            <Link
                                href="/#kamar"
                                className="mt-8 inline-flex rounded-2xl bg-purple-600 px-8 py-4 font-semibold text-white transition hover:bg-purple-700"
                            >
                                Cari Kamar
                            </Link>

                        </div>

                    )}

                    {/* LIST BOOKING */}
                    <div className="space-y-8">

                        {bookings.data.map((booking) => (

                            <div
                                key={booking.id}
                                className="group overflow-hidden rounded-[32px] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >

                                <div className="grid lg:grid-cols-3">

                                    {/* IMAGE */}
                                    <div className="relative overflow-hidden">

                                        <img
                                            src={`/storage/${booking.kamar.thumbnail}`}
                                            alt={booking.kamar.nama_kamar}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-8 lg:col-span-2">

                                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                                            {/* LEFT */}
                                            <div>

                                                <h2 className="text-3xl font-bold text-gray-900">
                                                    {booking.kamar.nama_kamar}
                                                </h2>

                                                <div className="mt-5 space-y-3 text-gray-500">

                                                    <p>
                                                        📅
                                                        {' '}
                                                        Tanggal Masuk:
                                                        {' '}
                                                        {booking.tanggal_masuk}
                                                    </p>

                                                    <p>
                                                        ⏳
                                                        {' '}
                                                        Durasi Sewa:
                                                        {' '}
                                                        {booking.durasi} bulan
                                                    </p>

                                                </div>

                                            </div>

                                            {/* STATUS */}
                                            <div>

                                                {booking.status === 'pending' && (

                                                    <div className="rounded-full bg-yellow-100 px-5 py-2 text-sm font-bold text-yellow-700">

                                                        Pending

                                                    </div>

                                                )}

                                                {booking.status === 'approved' && (

                                                    <div className="rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">

                                                        Approved

                                                    </div>

                                                )}

                                                {booking.status === 'rejected' && (

                                                    <div className="rounded-full bg-red-100 px-5 py-2 text-sm font-bold text-red-700">

                                                        Rejected

                                                    </div>

                                                )}

                                            </div>

                                        </div>
                                        

                                        {/* FOOTER */}
                                        <div className="mt-10 flex flex-col gap-6 border-t border-gray-100 pt-6 lg:flex-row lg:items-end lg:justify-between">

                                            <div>

                                                <p className="text-sm text-gray-400">
                                                    Total Harga
                                                </p>

                                                <h3 className="mt-2 text-4xl font-extrabold text-purple-600">

                                                    Rp
                                                    {(
                                                        booking.kamar.harga *
                                                        booking.durasi
                                                    ).toLocaleString('id-ID')}

                                                </h3>

                                            </div>

                                            <div className="flex gap-3">

                                                <Link
                                                    href={`/detail/${booking.kamar.id}`}
                                                    className="rounded-2xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                                                >
                                                    Detail Kamar
                                                </Link>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* Pagination */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">

            {bookings.links.map((link, index) => (

                <button
                    key={index}
                    disabled={!link.url}
                    onClick={() => {

                        if (link.url) {
                            router.visit(link.url);
                        }

                    }}
                    className={`rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300

                        ${
                            link.active
                                ? 'bg-purple-600 text-white shadow-xl shadow-purple-200 scale-105'

                                : 'bg-white text-gray-700 shadow-md shadow-gray-200 hover:-translate-y-1 hover:bg-purple-50 hover:text-purple-600 hover:shadow-lg'
                        }

                        ${
                            !link.url
                                ? 'cursor-not-allowed opacity-40'
                                : ''
                        }
                    `}
                    dangerouslySetInnerHTML={{
                                                    __html: link.label
                                                        .replace('&laquo; Previous', 'Previous')
                                                        .replace('Next &raquo;', 'Next')
                                                        .replace('pagination.previous', 'Previous')
                                                        .replace('pagination.next', 'Next'),
                                                }}
                />

            ))}

        </div>

        </GuestLayout>

    );
}