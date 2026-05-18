import { Head, Link } from '@inertiajs/react';
import {
    BedDouble,
    Wifi,
    ShieldCheck,
    Camera,
    ArrowRight,
    PlayCircle,
} from 'lucide-react';

interface Kamar {
    id: number;
    nama_kamar: string;
    harga: number;
    status: string;
    thumbnail: string;
}

interface Props {
    kamers: Kamar[];
}

export default function Welcome({ kamers }: Props) {
    return (
        <>
            <Head title="Kos Management 360" />

            <div className="min-h-screen bg-[#F7F9FC] text-gray-800">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-gray-900">
                                Kos<span className="text-blue-600">360</span>
                            </h1>
                        </div>

                        <div className="hidden items-center gap-8 md:flex">
                            <a
                                href="#home"
                                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                            >
                                Home
                            </a>

                            <a
                                href="#kamar"
                                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                            >
                                Kamar
                            </a>

                            <a
                                href="#fasilitas"
                                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                            >
                                Fasilitas
                            </a>

                            <a
                                href="#virtual"
                                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                            >
                                Virtual 360
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <section
                    id="home"
                    className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-28"
                >
                    <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"></div>

                    <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl"></div>

                    <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                                <Camera size={16} />
                                Virtual Room 360 Experience
                            </div>

                            <h1 className="text-5xl leading-tight font-black tracking-tight text-gray-900 lg:text-6xl">
                                Cari Kost Modern Dengan
                                <span className="text-blue-600">
                                    {' '}
                                    Virtual Tour 360°
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
                                Temukan kamar kost terbaik dengan fasilitas lengkap,
                                multimedia interaktif, video room tour, dan preview
                                virtual 360 tanpa harus datang langsung.
                            </p>

                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <a
                                    href="#kamar"
                                    className="flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-200 transition hover:bg-blue-700"
                                >
                                    Lihat Kamar
                                    <ArrowRight size={18} />
                                </a>

                                <a
                                    href="#virtual"
                                    className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-7 py-4 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
                                >
                                    <PlayCircle size={18} />
                                    Virtual Tour
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-300/30 blur-3xl"></div>

                            <img
                                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop"
                                alt="Kos"
                                className="relative z-10 h-[500px] w-full rounded-[32px] object-cover shadow-2xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Kamar */}
                <section
                    id="kamar"
                    className="px-6 py-20 lg:px-8"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 flex items-end justify-between">
                            <div>
                                <p className="text-sm font-bold tracking-widest text-blue-600 uppercase">
                                    Data Kamar
                                </p>

                                <h2 className="mt-2 text-4xl font-black tracking-tight text-gray-900">
                                    Kamar Tersedia
                                </h2>
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {kamers.map((kamar) => (
                                <div
                                    key={kamar.id}
                                    className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={`/storage/${kamar.thumbnail}` }
                                            alt={kamar.nama_kamar}
                                            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute top-5 right-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-blue-600 backdrop-blur-lg">
                                            {kamar.status}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-4 flex items-center gap-2 text-gray-500">
                                            <BedDouble size={18} />
                                            <span className="text-sm font-medium">
                                                Premium Room
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-gray-900">
                                            {kamar.nama_kamar}
                                        </h3>

                                        <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                            Kamar nyaman dengan fasilitas lengkap,
                                            akses mudah, dan lingkungan aman.
                                        </p>

                                        <div className="mt-6 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-gray-400">
                                                    Harga Mulai
                                                </p>

                                                <h4 className="text-2xl font-black text-blue-600">
                                                    Rp{' '}
                                                    {kamar.harga.toLocaleString()}
                                                </h4>
                                            </div>

                                            <Link
                                                href={`/detail/${kamar.id}`}
                                                className="rounded-2xl bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-black"
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Fasilitas */}
                <section
                    id="fasilitas"
                    className="px-6 py-20 lg:px-8"
                >
                    <div className="mx-auto max-w-7xl rounded-[36px] bg-white p-10 shadow-sm lg:p-14">
                        <div className="mb-12 text-center">
                            <p className="text-sm font-bold tracking-widest text-blue-600 uppercase">
                                Fasilitas
                            </p>

                            <h2 className="mt-3 text-4xl font-black text-gray-900">
                                Kenapa Pilih Kost Kami?
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-3xl bg-[#F7F9FC] p-8 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                    <Wifi size={28} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-gray-900">
                                    WiFi Cepat
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                    Akses internet stabil untuk kebutuhan kerja dan kuliah.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-[#F7F9FC] p-8 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                                    <ShieldCheck size={28} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-gray-900">
                                    Keamanan 24 Jam
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                    CCTV dan lingkungan aman untuk kenyamanan penghuni.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-[#F7F9FC] p-8 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600">
                                    <BedDouble size={28} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-gray-900">
                                    Kamar Nyaman
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                    Kamar bersih dan nyaman dengan fasilitas lengkap.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-[#F7F9FC] p-8 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                                    <Camera size={28} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-gray-900">
                                    Virtual 360
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                    Lihat kondisi kamar langsung melalui virtual room tour.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Virtual 360 */}
                <section
                    id="virtual"
                    className="px-6 py-20 lg:px-8"
                >
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white shadow-2xl lg:p-16">
                        <div className="grid items-center gap-10 lg:grid-cols-2">
                            <div>
                                <p className="text-sm font-bold tracking-widest text-blue-100 uppercase">
                                    Virtual Tour
                                </p>

                                <h2 className="mt-4 text-5xl leading-tight font-black">
                                    Jelajahi Kamar Dengan Pengalaman 360°
                                </h2>

                                <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100">
                                    Rasakan pengalaman melihat kamar secara interaktif
                                    melalui teknologi virtual panorama 360 derajat.
                                </p>

                                <button className="mt-10 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-blue-700 transition hover:bg-blue-50">
                                    Mulai Virtual Tour
                                </button>
                            </div>

                            <div>
                                <img
                                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop"
                                    alt="Virtual Tour"
                                    className="h-[400px] w-full rounded-[28px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white px-6 py-10 lg:px-8">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                        <div>
                            <h2 className="text-xl font-black text-gray-900">
                                Kos360
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Sistem Informasi Pemesanan Kost Berbasis Multimedia
                                Interaktif.
                            </p>
                        </div>

                        <p className="text-sm text-gray-400">
                            © 2026 Kos360. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

