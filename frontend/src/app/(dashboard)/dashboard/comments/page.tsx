export default function DashboardCommentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-serif font-bold">Comments</h1>
                <p className="text-muted">Manage discussions on your artworks.</p>
            </div>

            <div className="bg-card rounded-xl border border-muted/20 min-h-[300px] flex items-center justify-center">
                <p className="text-muted">No new comments.</p>
            </div>
        </div>
    );
}
