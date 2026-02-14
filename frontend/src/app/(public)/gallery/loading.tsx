export default function GalleryLoading() {
    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-24">
            <div className="mb-12 text-center">
                <div className="h-10 bg-muted/20 rounded w-64 mx-auto mb-4 animate-pulse" />
                <div className="h-4 bg-muted/10 rounded w-96 mx-auto animate-pulse" />
            </div>

            <div className="flex justify-center gap-6 mb-16">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-20 bg-muted/10 rounded animate-pulse" />
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="aspect-[4/5] bg-muted/20 rounded-lg mb-4" />
                        <div className="h-4 bg-muted/20 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-muted/10 rounded w-1/2 mb-2" />
                        <div className="h-3 bg-muted/10 rounded w-1/4" />
                    </div>
                ))}
            </div>
        </div>
    );
}
