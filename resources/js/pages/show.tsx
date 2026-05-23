import GuestLayout from '@/layouts/guest-layout';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import {
    Wifi,
    BedDouble,
    ShieldCheck,
    Camera,
    Snowflake,
    Ban,
    Car,
    Bath,
} from 'lucide-react';
import { useState } from 'react';


interface Multimedia {
    id: number;
    type: 'image' | 'video' | 'photo360';
    file: string;
}

interface Kamar {
    id: number;
    kode_kamar: string;
    nama_kamar: string;
    harga: number;
    fasilitas: string;
    deskripsi: string;
    status: string;
    thumbnail: string;
    multimedia: Multimedia[];
}

type Props = {
    kamar: Kamar;
    user: any;
};

export default function ShowKamar({ kamar, user }: Props) {

     const [open360, setOpen360] = useState(false);

     const { auth } = usePage().props as any;

    const [selectedImage, setSelectedImage] = useState(
        `/storage/${kamar.thumbnail}`
    );

    const images = kamar.multimedia.filter(
        (item) => item.type === 'image'
    );

    const videos = kamar.multimedia.filter(
        (item) => item.type === 'video'
    );

    const photo360 = kamar.multimedia.find(
        (item) => item.type === 'photo360'
    );

    const {
        data,
        setData,
        post,
        processing,
    } = useForm({

        tanggal_masuk: '',
        durasi: 1,
        catatan: '',

    });

    const submitBooking = (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        post(`/booking/${kamar.id}`);

    };

    return (
        <GuestLayout>
            <Head title={kamar.kode_kamar} />

            <div className="space-y-10">

                {/* Hero Detail */}
                <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">

                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* Left */}
                        <div className="p-6 lg:p-8">

                                                        <button
                                onClick={() => setOpen360(true)}
                                className="group relative overflow-hidden rounded-[28px]"
                            >

                                <img
                                    src={selectedImage}
                                    alt={kamar.nama_kamar}
                                    className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">

                                    <div className="rounded-full bg-white/90 px-5 py-3 text-sm font-bold text-gray-900 backdrop-blur-lg">
                                        View 360 Tour
                                    </div>

                                </div>

                            </button>

                            {/* Gallery */}
                            <div className="mt-5 flex gap-3 overflow-x-auto pb-2">

                                <button
                                    onClick={() =>
                                        setSelectedImage(
                                            `/storage/${kamar.thumbnail}`
                                        )
                                    }
                                    className="overflow-hidden rounded-2xl border-2 border-blue-500"
                                >
                                    <img
                                        src={`/storage/${kamar.thumbnail}`}
                                        alt="thumbnail"
                                        className="h-20 w-24 object-cover"
                                    />
                                </button>

                                {images.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() =>
                                            setSelectedImage(
                                                `/storage/${image.file}`
                                            )
                                        }
                                        className="overflow-hidden rounded-2xl border border-gray-200 transition hover:border-blue-500"
                                    >
                                        <img
                                            src={`/storage/${image.file}`}
                                            alt="gallery"
                                            className="h-20 w-24 object-cover"
                                        />
                                    </button>
                                ))}

                            </div>

                            {/* Booking */}
                            <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                    Booking Kamar
                                </h2>

                                <form
                                    onSubmit={submitBooking}
                                    className="space-y-6"
                                >

                                    {/* tanggal */}
                                    <div>

                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Tanggal Masuk
                                        </label>

                                        <input
                                            type="date"
                                            value={data.tanggal_masuk}
                                            onChange={(e) =>
                                                setData(
                                                    'tanggal_masuk',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                                        />

                                    </div>

                                    {/* durasi */}
                                    <div>

                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Durasi Sewa (bulan)
                                        </label>

                                        <input
                                            type="number"
                                            min={1}
                                            value={data.durasi}
                                            onChange={(e) =>
                                                setData(
                                                    'durasi',
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                                        />

                                    </div>

                                    {/* catatan */}
                                    <div>

                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Catatan
                                        </label>

                                        <textarea
                                            rows={4}
                                            value={data.catatan}
                                            onChange={(e) =>
                                                setData(
                                                    'catatan',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                                            placeholder="Contoh: saya mahasiswa semester 5..."
                                        />

                                    </div>

                                   {
     auth.user ? (

        <button
            disabled={processing}
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >

            {
                processing
                    ? 'Mengirim...'
                    : 'Pesan Sekarang'
            }

        </button>

    ) : (

        <Link
            href="/login"
            className="inline-flex rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >

            Login Untuk Booking

        </Link>

    )
}

                                </form>

                            </div>

                        </div>

                        {/* Right */}
                        <div className="flex flex-col justify-between p-6 lg:p-10">

                            <div>

                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                                    <BedDouble size={16} />
                                    {kamar.status}
                                </div>

                                <h1 className="text-4xl font-black tracking-tight text-gray-900">
                                    Kamar {' '}
                                    {kamar.kode_kamar}
                                </h1>

                                <p className="mt-4 text-lg leading-relaxed text-gray-500">
                                    {kamar.deskripsi}
                                </p>

                                <div className="mt-8 rounded-3xl bg-[#F7F9FC] p-6">

                                    <p className="text-sm font-medium text-gray-400">
                                        Harga Sewa
                                    </p>

                                    <h2 className="mt-2 text-4xl font-black text-blue-600">
                                        Rp {kamar.harga.toLocaleString()}
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        / bulan
                                    </p>

                                </div>

                                {/* Fasilitas */}
                                <div className="mt-8">

                                <h3 className="mb-5 text-xl font-bold text-gray-900">
                                    Fasilitas
                                </h3>

                                <div className="grid gap-4 md:grid-cols-2">

                                    {/* WIFI */}
                                    <div
                                        className={`relative flex items-center gap-3 rounded-2xl p-4 transition
                                        ${
                                            kamar.wifi
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'bg-gray-100 text-gray-400'
                                        }`}
                                    >

                                        <div className="relative">

                                            <Wifi size={22} />

                                            {!kamar.wifi && (

                                                <Ban
                                                    size={28}
                                                    className="absolute -top-1 -left-1 text-red-500"
                                                />

                                            )}

                                        </div>

                                        <span
                                            className={`font-medium ${
                                                !kamar.wifi
                                                    ? 'line-through'
                                                    : ''
                                            }`}
                                        >
                                            WiFi Cepat
                                        </span>

                                    </div>

                                    {/* AC */}
                                    <div
                                        className={`relative flex items-center gap-3 rounded-2xl p-4 transition
                                        ${
                                            kamar.ac
                                                ? 'bg-cyan-50 text-cyan-600'
                                                : 'bg-gray-100 text-gray-400'
                                        }`}
                                    >

                                        <div className="relative">

                                            <Snowflake size={22} />

                                            {!kamar.ac && (

                                                <Ban
                                                    size={28}
                                                    className="absolute -top-1 -left-1 text-red-500"
                                                />

                                            )}

                                        </div>

                                        <span
                                            className={`font-medium ${
                                                !kamar.ac
                                                    ? 'line-through'
                                                    : ''
                                            }`}
                                        >
                                            AC
                                        </span>

                                    </div>

                                    {/* FULLY FURNISHED */}
                                    <div
                                        className={`relative flex items-center gap-3 rounded-2xl p-4 transition
                                        ${
                                            kamar.fully_furnished
                                                ? 'bg-yellow-50 text-yellow-600'
                                                : 'bg-gray-100 text-gray-400'
                                        }`}
                                    >

                                        <div className="relative">

                                            <BedDouble size={22} />

                                            {!kamar.fully_furnished && (

                                                <Ban
                                                    size={28}
                                                    className="absolute -top-1 -left-1 text-red-500"
                                                />

                                            )}

                                        </div>

                                        <span
                                            className={`font-medium ${
                                                !kamar.fully_furnished
                                                    ? 'line-through'
                                                    : ''
                                            }`}
                                        >
                                            Fully Furnished
                                        </span>

                                    </div>

                                    {/* CCTV */}
                                    <div
                                        className={`relative flex items-center gap-3 rounded-2xl p-4 transition
                                        ${
                                            kamar.cctv
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-gray-100 text-gray-400'
                                        }`}
                                    >

                                        <div className="relative">

                                            <ShieldCheck size={22} />

                                            {!kamar.cctv && (

                                                <Ban
                                                    size={28}
                                                    className="absolute -top-1 -left-1 text-red-500"
                                                />

                                            )}

                                        </div>

                                        <span
                                            className={`font-medium ${
                                                !kamar.cctv
                                                    ? 'line-through'
                                                    : ''
                                            }`}
                                        >
                                            CCTV
                                        </span>

                                    </div>

                                    {/* PARKIR */}
                                    <div
                                        className={`relative flex items-center gap-3 rounded-2xl p-4 transition
                                        ${
                                            kamar.parkir
                                                ? 'bg-orange-50 text-orange-600'
                                                : 'bg-gray-100 text-gray-400'
                                        }`}
                                    >

                                        <div className="relative">

                                            <Car size={22} />

                                            {!kamar.parkir && (

                                                <Ban
                                                    size={28}
                                                    className="absolute -top-1 -left-1 text-red-500"
                                                />

                                            )}

                                        </div>

                                        <span
                                            className={`font-medium ${
                                                !kamar.parkir
                                                    ? 'line-through'
                                                    : ''
                                            }`}
                                        >
                                            Parkir
                                        </span>

                                    </div>

                                    {/* KAMAR MANDI */}
                                    <div
                                        className={`relative flex items-center gap-3 rounded-2xl p-4 transition
                                        ${
                                            kamar.kamar_mandi_dalam
                                                ? 'bg-pink-50 text-pink-600'
                                                : 'bg-gray-100 text-gray-400'
                                        }`}
                                    >

                                        <div className="relative">

                                            <Bath size={22} />

                                            {!kamar.kamar_mandi_dalam && (

                                                <Ban
                                                    size={28}
                                                    className="absolute -top-1 -left-1 text-red-500"
                                                />

                                            )}

                                        </div>

                                        <span
                                            className={`font-medium ${
                                                !kamar.kamar_mandi_dalam
                                                    ? 'line-through'
                                                    : ''
                                            }`}
                                        >
                                            Kamar Mandi Dalam
                                        </span>

                                    </div>

                                </div>

                                {/* fasilitas tambahan */}
                                {
                                    kamar.fasilitas_tambahan && (

                                        <div className="mt-8 rounded-2xl bg-gray-50 p-5">

                                            <h4 className="mb-3 text-lg font-bold text-gray-900">
                                                Fasilitas Tambahan
                                            </h4>

                                            <p className="leading-8 text-gray-600">
                                                {kamar.fasilitas_tambahan}
                                            </p>

                                        </div>

                                    )
                                }

                            </div>

                            </div>

                            {/* Button */}

                        </div>

                    </div>

                </div>

                {/* Video */}
                {videos.length > 0 && (

                    <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">

                        <div className="mb-8">

                            <p className="text-sm font-bold tracking-widest text-blue-600 uppercase">
                                Video Tour
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-gray-900">
                                Room Tour Video
                            </h2>

                        </div>

                        <div className="grid gap-8 lg:grid-cols-2">

                            {videos.map((video) => (

                                <div
                                    key={video.id}
                                    className="overflow-hidden rounded-3xl"
                                >

                                    <video
                                        controls
                                        className="w-full rounded-3xl"
                                    >
                                        <source
                                            src={`/storage/${video.file}`}
                                        />
                                    </video>

                                </div>

                            ))}

                        </div>

                    </div>

                )}
                {
                    open360 && (

                        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6">

                            {/* close */}
                            <button
                                onClick={() => setOpen360(false)}
                                className="absolute top-6 right-6 z-50 rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-900"
                            >
                                Close
                            </button>

                            <div className="h-[90vh] w-full overflow-hidden rounded-3xl">

                                <ReactPhotoSphereViewer
                                    src={selectedImage}
                                    height="100%"
                                    width="100%"
                                />

                            </div>

                        </div>

                    )
                }

            </div>
</GuestLayout>
    );
    
}


