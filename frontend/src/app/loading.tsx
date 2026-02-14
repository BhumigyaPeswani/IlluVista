export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-muted/30 border-t-accent rounded-full animate-spin" />
                <p className="text-sm text-muted animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
