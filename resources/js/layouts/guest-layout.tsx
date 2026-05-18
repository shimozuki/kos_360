import { Link } from '@inertiajs/react';

interface Props {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: Props) {

    return (

        <div className="min-h-screen bg-[#F7F9FC] text-gray-800">

            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                    <div>

                        <Link href="/">

                            <h1 className="text-2xl font-black tracking-tight text-gray-900">
                                Kos<span className="text-blue-600">360</span>
                            </h1>

                        </Link>

                    </div>

                    <div className="hidden items-center gap-8 md:flex">

                        <a
                            href="/#home"
                            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                        >
                            Home
                        </a>

                        <a
                            href="/#kamar"
                            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                        >
                            Kamar
                        </a>

                        <a
                            href="/#fasilitas"
                            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                        >
                            Fasilitas
                        </a>

                        <a
                            href="/#virtual"
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

            {/* Content */}
            <main className="px-6 py-10 lg:px-8">

                {children}

            </main>

            {/* Footer */}
            <footer className="mt-20 border-t border-gray-200 bg-white px-6 py-10 lg:px-8">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">

                    <div>

                        <h2 className="text-xl font-black text-gray-900">
                            Kos360
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Sistem Informasi Pemesanan Kost Multimedia Interaktif.
                        </p>

                    </div>

                    <p className="text-sm text-gray-400">
                        © 2026 Kos360. All rights reserved.
                    </p>

                </div>

            </footer>

        </div>

    );

}