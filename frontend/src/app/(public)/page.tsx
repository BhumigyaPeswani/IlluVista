import Hero from "@/components/home/Hero";
import ArtworkCard from "@/components/ArtworkCard";
import { Artwork } from "@/types";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getFeaturedArtworks(): Promise<Artwork[]> {
  try {
    const res = await fetch(`${API_URL}/api/artworks`, { next: { revalidate: 60 } }); // Cache and revalidate every 60s
    if (!res.ok) return [];
    const json = await res.json();
    const data = json.data || [];
    return Array.isArray(data) ? data.slice(0, 3) : [];
  } catch (error) {
    console.error('Failed to fetch artworks:', error);
    return [];
  }
}

export default async function Home() {
  const artworks = await getFeaturedArtworks();

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Featured Artworks Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-4">Curated Selection</p>
            <h2 className="text-4xl md:text-5xl font-serif font-medium">Featured Artworks</h2>
          </div>
          <Link href="/gallery" className="text-sm uppercase tracking-widest border-b border-muted/30 pb-1 hover:border-accent transition-colors">
            View All Collection
          </Link>
        </div>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork._id || artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted">
            <p>No artworks available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="bg-muted/5 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-16">How IlluVista Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <span className="text-4xl font-serif text-accent/20 block mb-6">01</span>
              <h3 className="text-xl font-medium mb-4">Discover</h3>
              <p className="text-muted text-sm leading-relaxed">Browse through our exclusive collection of high-end digital art and generative masterpieces.</p>
            </div>
            <div>
              <span className="text-4xl font-serif text-accent/20 block mb-6">02</span>
              <h3 className="text-xl font-medium mb-4">Collect</h3>
              <p className="text-muted text-sm leading-relaxed">Purchase unique artworks directly from independent artists around the globe.</p>
            </div>
            <div>
              <span className="text-4xl font-serif text-accent/20 block mb-6">03</span>
              <h3 className="text-xl font-medium mb-4">Display</h3>
              <p className="text-muted text-sm leading-relaxed">Own a piece of the future and showcase your collection in the digital realm.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
