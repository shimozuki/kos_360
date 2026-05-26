import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

interface Kamar {
    id: number;
    kode_kamar: string;
    nama_kamar: string;
    harga: number;
    fasilitas: string;
    status: string;
    thumbnail: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    kamers: {
        data: Kamar[];
        links: PaginationLink[];
    };
}

export default function KamarIndex({ kamers }: Props) {

    const { flash } = usePage().props as any;

    useEffect(() => {

    if (flash.success) {

        Swal.fire({

            icon: 'success',

            title: 'Berhasil',

            text: flash.success,

            showConfirmButton: false,

            timer: 2000,

        });

    }

}, [flash]);

    const handleDelete = (id: number) => {

        Swal.fire({
            title: 'Hapus kamar?',
            text: 'Data kamar akan dihapus permanen.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {

            if (result.isConfirmed) {

                router.delete(`/kamar/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Data kamar berhasil dihapus.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                });

            }

        });

    };

    return (
        <AppLayout>
            <Head title="Kamar" />

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Data Kamar
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Kelola semua data kamar kost.
                        </p>
                    </div>

                    <Link
                        href="/kamar/create"
                        className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700">
                        Tambah Kamar
                    </Link>

                </div>

                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="min-w-full border-separate border-spacing-y-3">

                        <thead>
                            <tr className="text-left text-sm text-gray-500">

                                <th className="px-4">Thumbnail</th>
                                <th className="px-4">Kode</th>
                                {/* <th className="px-4">Nama Kamar</th> */}
                                <th className="px-4">Harga</th>
                                <th className="px-4">Status</th>
                                <th className="px-4">Action</th>

                            </tr>
                        </thead>

                        <tbody>

                            {kamers.data.map((kamar) => (

                                <tr
                                    key={kamar.id}
                                    className="rounded-2xl bg-gray-50"
                                >

                                    <td className="rounded-l-2xl px-4 py-4">
                                        <img
                                            src={`/storage/${kamar.thumbnail}`}
                                            alt={kamar.nama_kamar}
                                            className="h-16 w-24 rounded-xl object-cover"
                                        />
                                    </td>

                                    <td className="px-4 py-4 font-medium">
                                        {kamar.kode_kamar}
                                    </td>

                                    {/* <td className="px-4 py-4">
                                        {kamar.nama_kamar}
                                    </td> */}

                                    <td className="px-4 py-4">
                                        Rp {kamar.harga.toLocaleString()}
                                    </td>

                                    <td className="px-4 py-4">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                kamar.status === 'tersedia'
                                                    ? 'bg-green-100 text-green-600'
                                                    : kamar.status === 'dipesan'
                                                      ? 'bg-yellow-100 text-yellow-600'
                                                      : 'bg-red-100 text-red-600'
                                            }`}
                                        >
                                            {kamar.status}
                                        </span>

                                    </td>

                                    <td className="rounded-r-2xl px-4 py-4">

                                        <div className="flex items-center gap-2">

                                            <Link
                                                href={`/kamar/${kamar.id}/edit`}
                                                className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(kamar.id)}
                                                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}
                <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6">

                    {kamers.links.map((link, index) => (

                        <Link
                            key={index}
                            href={link.url || '#'}
                            dangerouslySetInnerHTML={{
                                __html: link.label
                                    .replace('&laquo; Previous', 'Previous')
                                    .replace('Next &raquo;', 'Next')
                                    .replace('pagination.previous', 'Previous')
                                    .replace('pagination.next', 'Next'),
                            }}
                            className={`rounded-lg px-4 py-2 text-sm transition ${
                                link.active
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        />

                    ))}

                </div>

            </div>
        </AppLayout>
    );
}