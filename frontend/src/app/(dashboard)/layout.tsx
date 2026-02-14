'use client';

export default function DashboardGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This is a simple pass-through layout.
    // AuthProvider is already in root layout.
    // Child layouts (dashboard/layout.tsx for artists, account/layout.tsx for buyers)
    // each render their own appropriate sidebar/navigation.
    return <>{children}</>;
}
