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

                    <table className="w-full">

                        <thead>

                            <tr className="text-left text-gray-500">

                                <th className="pb-4">
                                    Penyewa
                                </th>

                                <th className="pb-4">
                                    Kamar
                                </th>

                                <th className="pb-4">
                                    Tanggal Masuk
                                </th>

                                <th className="pb-4">
                                    Durasi
                                </th>

                                <th className="pb-4">
                                    Status
                                </th>

                                <th className="pb-4">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {bookings.map(
                                (booking) => (

                                <tr
                                    key={booking.id}
                                    className="border-t border-gray-100"
                                >

                                    <td className="py-5">
                                        {
                                            booking.user
                                                .name
                                        }
                                    </td>

                                    <td className="py-5">
                                        {
                                            booking.kamar
                                                .nama_kamar
                                        }
                                    </td>

                                    <td className="py-5">
                                        {
                                            booking.tanggal_masuk
                                        }
                                    </td>

                                    <td className="py-5">
                                        {
                                            booking.durasi
                                        } bulan
                                    </td>

                                    <td className="py-5">

                                        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

                                            {
                                                booking.status
                                            }

                                        </span>

                                    </td>

                                    <td className="py-5">

                                        <div className="flex gap-3">

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        booking.id,
                                                        'approved'
                                                    )
                                                }
                                                className="rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white"
                                            >

                                                Approve

                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        booking.id,
                                                        'rejected'
                                                    )
                                                }
                                                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                                            >

                                                Reject

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </AppLayout>

    );
}