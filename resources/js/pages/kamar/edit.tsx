import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

import {
    Wifi,
    Snowflake,
    BedDouble,
    ShieldCheck,
    Car,
    Bath,
} from 'lucide-react';

interface Multimedia {
    id: number;
    type: string;
    file: string;
}

interface Kamar {
    id: number;
    kode_kamar: string;
    nama_kamar: string;
    harga: number;
    deskripsi: string;
    status: string;

    wifi: boolean;
    ac: boolean;
    fully_furnished: boolean;
    kamar_mandi_dalam: boolean;
    parkir: boolean;
    cctv: boolean;

    fasilitas_tambahan: string;

    thumbnail: string;

    multimedia: Multimedia[];
}

export default function Edit({
    kamar,
}: {
    kamar: Kamar;
}) {

    const {
        data,
        setData,
        post,
        processing,
    } = useForm({

        _method: 'put',

        kode_kamar:
            kamar.kode_kamar || '',

        nama_kamar:
            kamar.nama_kamar || '',

        harga:
            kamar.harga || '',

        deskripsi:
            kamar.deskripsi || '',

        status:
            kamar.status || 'tersedia',

        wifi:
            kamar.wifi || false,

        ac:
            kamar.ac || false,

        fully_furnished:
            kamar.fully_furnished || false,

        kamar_mandi_dalam:
            kamar.kamar_mandi_dalam || false,

        parkir:
            kamar.parkir || false,

        cctv:
            kamar.cctv || false,

        fasilitas_tambahan:
            kamar.fasilitas_tambahan || '',

        thumbnail:
            null as File | null,

        gallery:
            [] as File[],

    });

    const submit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        post(`/kamar/${kamar.id}`, {
            forceFormData: true,
        });

    };

    return (

        <AppLayout>

            <Head title="Edit Kamar" />

            <div className="rounded-3xl bg-white p-8 shadow-sm">

                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Edit Kamar
                </h1>

                <p className="mb-8 text-gray-500">
                    Update data kamar dan multimedia.
                </p>

                <form
                    onSubmit={submit}
                    className="space-y-8"
                >

                    {/* kode kamar */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Nomor Kamar
                        </label>

                        <input
                            type="text"
                            value={data.kode_kamar}
                            onChange={(e) =>
                                setData(
                                    'kode_kamar',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>

                    {/* nama kamar */}
                    {/* <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Nama Kamar
                        </label>

                        <input
                            type="text"
                            value={data.nama_kamar}
                            onChange={(e) =>
                                setData(
                                    'nama_kamar',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div> */}

                    {/* harga */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Harga
                        </label>

                        <input
                            type="number"
                            value={data.harga}
                            onChange={(e) =>
                                setData(
                                    'harga',
                                    Number(e.target.value)
                                )
                            }
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>

                    {/* status */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Status
                        </label>

                        <select
                            value={data.status}
                            onChange={(e) =>
                                setData(
                                    'status',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        >

                            <option value="tersedia">
                                Tersedia
                            </option>

                            <option value="terisi">
                                Terisi
                            </option>

                            <option value="maintenance">
                                Maintenance
                            </option>

                        </select>

                    </div>

                    {/* deskripsi */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Deskripsi
                        </label>

                        <textarea
                            rows={5}
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData(
                                    'deskripsi',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>

                    {/* thumbnail */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Thumbnail Baru
                        </label>

                        <input
                            type="file"
                            onChange={(e) =>
                                setData(
                                    'thumbnail',
                                    e.target.files?.[0] || null
                                )
                            }
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                        />

                        <img
                            src={`/storage/${kamar.thumbnail}`}
                            className="mt-4 h-52 w-full rounded-3xl object-cover"
                        />

                    </div>

                    {/* multimedia baru */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Tambah Gallery / Video / Photo360
                        </label>

                        <input
                            type="file"
                            multiple
                            onChange={(e) =>
                                setData(
                                    'gallery',
                                    Array.from(
                                        e.target.files || []
                                    )
                                )
                            }
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                        />

                        <p className="mt-2 text-sm text-gray-400">
                            Upload image, video, atau panorama 360.
                        </p>

                    </div>

                    {/* multimedia lama */}
                    <div>

                        <h3 className="mb-4 text-lg font-bold text-gray-900">
                            Multimedia Lama
                        </h3>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                            {
                                kamar.multimedia?.map(
                                    (item) => (

                                        item.type === 'video'

                                            ? (

                                                <video
                                                    key={item.id}
                                                    controls
                                                    className="h-40 w-full rounded-2xl object-cover"
                                                >

                                                    <source
                                                        src={`/storage/${item.file}`}
                                                    />

                                                </video>

                                            )

                                            : (

                                                <img
                                                    key={item.id}
                                                    src={`/storage/${item.file}`}
                                                    className="h-40 w-full rounded-2xl object-cover"
                                                />

                                            )

                                    )
                                )
                            }

                        </div>

                    </div>

                    {/* fasilitas */}
                    <div>

                        <h3 className="mb-4 text-lg font-bold text-gray-900">
                            Fasilitas
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">

                            <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-5">

                                <input
                                    type="checkbox"
                                    checked={data.wifi}
                                    onChange={(e) =>
                                        setData(
                                            'wifi',
                                            e.target.checked
                                        )
                                    }
                                />

                                <Wifi size={20} />

                                WiFi

                            </label>

                            <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-5">

                                <input
                                    type="checkbox"
                                    checked={data.ac}
                                    onChange={(e) =>
                                        setData(
                                            'ac',
                                            e.target.checked
                                        )
                                    }
                                />

                                <Snowflake size={20} />

                                AC

                            </label>

                            <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-5">

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

                                <BedDouble size={20} />

                                Fully Furnished

                            </label>

                            <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-5">

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

                                <Bath size={20} />

                                Kamar Mandi Dalam

                            </label>

                            <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-5">

                                <input
                                    type="checkbox"
                                    checked={data.parkir}
                                    onChange={(e) =>
                                        setData(
                                            'parkir',
                                            e.target.checked
                                        )
                                    }
                                />

                                <Car size={20} />

                                Parkir

                            </label>

                            <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-5">

                                <input
                                    type="checkbox"
                                    checked={data.cctv}
                                    onChange={(e) =>
                                        setData(
                                            'cctv',
                                            e.target.checked
                                        )
                                    }
                                />

                                <ShieldCheck size={20} />

                                CCTV

                            </label>

                        </div>

                    </div>

                    {/* fasilitas tambahan */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Fasilitas Tambahan
                        </label>

                        <textarea
                            rows={4}
                            value={data.fasilitas_tambahan}
                            onChange={(e) =>
                                setData(
                                    'fasilitas_tambahan',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>

                    {/* submit */}
                    <button
                        disabled={processing}
                        className="rounded-2xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {
                            processing
                                ? 'Uploading...'
                                : 'Update Kamar'
                        }

                    </button>

                </form>

            </div>

        </AppLayout>

    );
}