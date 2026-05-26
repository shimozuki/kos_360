import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateKamar() {

    const { data, setData, post, processing, errors} = useForm({
        kode_kamar: '',
        harga: 0,
        deskripsi: '',
        status: 'tersedia',

        thumbnail: null as File | null,

        wifi: false,
        ac: false,
        fully_furnished: false,
        kamar_mandi_dalam: false,
        parkir: false,
        cctv: false,

        fasilitas_tambahan: '',
    });

    const submit = (e: React.FormEvent) => {

        e.preventDefault();

        post('/kamar');

    };

    return (
        <AppLayout>

            <Head title="Tambah Kamar" />

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

                <div className="mb-8">

                    <h1 className="text-2xl font-bold text-gray-800">
                        Tambah Kamar
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Tambahkan data kamar baru beserta multimedia.
                    </p>

                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6"
                >

                    {/* kode kamar */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nomor Kamar
                        </label>

                        <input
                            type="text"
                            value={data.kode_kamar}
                            onChange={(e) =>
                                setData('kode_kamar', e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>

                    {/* nama kamar */}
                    {/* <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nama Kamar
                        </label>

                        <input
                            type="text"
                            value={data.nama_kamar}
                            onChange={(e) =>
                                setData('nama_kamar', e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div> */}

                    {/* harga */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Harga
                        </label>

                        <input
                            type="number"
                            value={data.harga}
                            onChange={(e) =>
                                setData('harga', e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>

                    {/* deskripsi */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Deskripsi
                        </label>

                        <textarea
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData('deskripsi', e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>

                    {/* thumbnail */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Thumbnail
                        </label>

                        <input
                            type="file"
                            onChange={(e) =>
                                setData(
                                    'thumbnail',
                                    e.target.files?.[0] || null
                                )
                            }
                            className="w-full rounded-xl border border-gray-200 p-3"
                        />

                    </div>

                    {/* media */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Gallery & Video
                        </label>

                        <input
                            type="file"
                            multiple
                            onChange={(e) =>
                                setData(
                                    'media',
                                    Array.from(e.target.files || [])
                                )
                            }
                            className="w-full rounded-xl border border-gray-200 p-3"
                        />

                    </div>
                    <div>

    <label className="mb-4 block text-sm font-semibold text-gray-700">
        Fasilitas
    </label>

    <div className="grid gap-4 md:grid-cols-2">

        {/* wifi */}
        <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">

            <input
                type="checkbox"
                checked={data.wifi}
                onChange={(e) =>
                    setData('wifi', e.target.checked)
                }
            />

            <span>WiFi</span>

        </label>

        {/* ac */}
        <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">

            <input
                type="checkbox"
                checked={data.ac}
                onChange={(e) =>
                    setData('ac', e.target.checked)
                }
            />

            <span>AC</span>

        </label>

        {/* furnished */}
        <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">

            <input
                type="checkbox"
                checked={data.fully_furnished}
                onChange={(e) =>
                    setData(
                        'fully_furnished',
                        e.target.checked
                    )
                }
            />

            <span>Fully Furnished</span>

        </label>

        {/* kamar mandi */}
        <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">

            <input
                type="checkbox"
                checked={data.kamar_mandi_dalam}
                onChange={(e) =>
                    setData(
                        'kamar_mandi_dalam',
                        e.target.checked
                    )
                }
            />

            <span>Kamar Mandi Dalam</span>

        </label>

        {/* parkir */}
        <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">

            <input
                type="checkbox"
                checked={data.parkir}
                onChange={(e) =>
                    setData('parkir', e.target.checked)
                }
            />

            <span>Parkir</span>

        </label>

        {/* cctv */}
        <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">

            <input
                type="checkbox"
                checked={data.cctv}
                onChange={(e) =>
                    setData('cctv', e.target.checked)
                }
            />

            <span>CCTV</span>

        </label>

    </div>

</div>

<div>

    <label className="mb-2 block text-sm font-semibold text-gray-700">
        Fasilitas Tambahan
    </label>

    <textarea
        value={data.fasilitas_tambahan}
        onChange={(e) =>
            setData(
                'fasilitas_tambahan',
                e.target.value
            )
        }
        rows={4}
        className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
        placeholder="Contoh: Smart TV, dispenser, balkon pribadi..."
    />

</div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
                    >
                        Simpan Kamar
                    </button>

                </form>

            </div>

        </AppLayout>
    );
}