import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

interface Booking {
    id: number;
    tanggal_masuk: string;
    durasi: number;
    status: string;
    user: {
        name: string;
    };
    kamar: {
        nama_kamar: string;
    };
}

export default function Index({
    bookings,
}: {
    bookings: Booking[];
}) {

    const updateStatus = (
        id: number,
        status: string
    ) => {

        Swal.fire({

            title: 'Yakin?',

            text:
                `Booking akan ${status}`,

            icon: 'question',

            showCancelButton: true,

            confirmButtonText: 'Ya',

        }).then((result) => {

            if (result.isConfirmed) {

                router.put(
                    `/admin/booking/${id}/status`,
                    {
                        status,
                    }
                );

            }

        });

    };

    return (

        <AppLayout>

            <Head title="Booking" />

            <div className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Data Booking
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Kelola semua booking kamar.
                    </p>

                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full border-separate border-spacing-y-3">

                        <thead>

                            <tr className="text-left text-sm text-gray-500">

                                 <th className="px-4">
                                    Penyewa
                                </th>

                                 <th className="px-4">
                                    Kamar
                                </th>

                                 <th className="px-4">
                                    Tanggal Masuk
                                </th>

                                 <th className="px-4">
                                    Durasi
                                </th>

                                 <th className="px-4">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {bookings.data.map((booking) => (

                                <tr
                                    key={booking.id}
                                    className="rounded-2xl bg-gray-50"
                                >

                                    <td className="rounded-l-2xl px-4 py-4">
                                        {
                                            booking.user
                                                .name
                                        }
                                    </td>

                                    <td className="rounded-l-2xl px-4 py-4">
                                        {
                                            booking.kamar
                                                .nama_kamar
                                        }
                                    </td>

                                    <td className="rounded-l-2xl px-4 py-4">
                                        {
                                            booking.tanggal_masuk
                                        }
                                    </td>

                                    <td className="rounded-l-2xl px-4 py-4">
                                        {
                                            booking.durasi
                                        } bulan
                                    </td>

                                    <td className="rounded-l-2xl px-4 py-4">

                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-semibold capitalize

                                        ${
                                            booking.status === 'approved'
                                                ? 'bg-green-100 text-green-700'

                                            : booking.status === 'rejected'
                                                ? 'bg-red-100 text-red-700'

                                            : 'bg-yellow-100 text-yellow-700'
                                        }
                                    `}
                                    >

                                        {booking.status}

                                    </span>

                                </td>

                                    <td className="rounded-l-2xl px-4 py-4">

                                    {booking.status === 'pending' && (

                                        <div className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    router.put(
                                                        `/admin/booking/${booking.id}/approve`
                                                    )
                                                }
                                                className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() =>
                                                    router.put(
                                                        `/admin/booking/${booking.id}/reject`
                                                    )
                                                }
                                                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                                            >
                                                Reject
                                            </button>

                                        </div>

                                    )}

                                </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
                            <div className="mt-6 flex gap-2">

                {bookings.links.map((link, index) => (

                    <button
                        key={index}
                        disabled={!link.url}
                        onClick={() => {
                            if (link.url) {
                                router.visit(link.url);
                            }
                        }}
                        className={`rounded-lg px-4 py-2 text-sm ${
                            link.active
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-700'
                        }`}
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

            </div>

        </AppLayout>

    );
}