import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import {  User as UserIcon } from 'lucide-react';

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    phone: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface UsersPagination {
    data: UserData[];
    links: PaginationLink[];
}

interface Props {
    users: UsersPagination;
}

const UsersIcon: React.FC<{ size?: number; className?: string }> = ({
    size,
    className,
}) => (
    <svg
        width={size}
        height={size}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const handleDelete = (id: number) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'User yang dihapus tidak bisa dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(`/user/${id}`, {
                onSuccess: () => {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'User berhasil dihapus.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                },
            });
        }
    });
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: dashboard().url,
    },
];

export default function Dashboard({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm lg:p-8">
                {/* Header */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                            <UsersIcon size={24} className="text-gray-600" />
                            {users.data.length} Total Users
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            View and manage all users here.
                        </p>
                    </div>

                    {/* <div className="w-full sm:w-auto">
                        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition-colors hover:bg-purple-700 sm:w-auto">
                            <span>Add New</span>
                            <Plus size={18} strokeWidth={3} />
                        </button>
                    </div> */}
                </div>

                {/* Title */}
                <div className="mb-6 hidden lg:block">
                    <h3 className="text-lg font-bold text-gray-800">
                        All Users
                    </h3>
                </div>

                {/* Users List */}
                <div className="space-y-4">
                    {users.data.map((user) => (
                        <div
                            key={user.id}
                            className="group flex flex-col items-start rounded-2xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 lg:flex-row lg:items-center"
                        >
                            {/* User Info */}
                            <div className="flex w-full items-center gap-4 lg:w-[40%]">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                    <UserIcon size={24} />
                                </div>

                                <div>
                                    <h4 className="text-base font-bold text-gray-900">
                                        {user.name}
                                    </h4>

                                    <div className="mt-1 text-sm text-gray-500">
                                        {user.email}
                                    </div>

                                    <div className="mt-1 text-sm text-gray-500">
                                        {user.phone}
                                    </div>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="mt-4 flex w-full items-center justify-start gap-4 lg:mt-0 lg:w-[35%]">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4F6F9] text-gray-500 transition-all group-hover:bg-white group-hover:shadow-sm">
                                    <UserIcon size={20} strokeWidth={2} />
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-400">
                                        User Role
                                    </span>

                                    <span className="font-bold capitalize text-gray-900">
                                        {user.role}
                                    </span>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="mt-4 flex w-full justify-end lg:mt-0 lg:w-[25%]">
                                <button
                                onClick={()=>handleDelete(user.id)}
                                className="w-full rounded-xl bg-red-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-200 transition-colors hover:bg-red-600 lg:w-auto">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-15 flex flex-wrap gap-2">
                    {users.links.map((link, index) => (
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