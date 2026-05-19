// Expanding hover gallery (21st.dev template, adapted).
// - Removed the global `* { font-family }` + Google Fonts @import: the site
//   already loads Poppins via next/font and a global selector would override
//   the whole page's typography.
// - Fixed the broken JSX from the snippet (the map was missing closing tags).
// - Added a touch fallback: the hover-expand needs a pointer, so on small
//   screens we show a simple horizontal scroller instead.

const images = [
  "/gallery/classroom-1.png",
  "/gallery/classroom-2.png",
  "/gallery/classroom-3.png",
  "/gallery/playground-1.png",
  "/gallery/playground-2.png",
  "/gallery/playground-3.png",
];

export default function ExpandingGallery() {
  return (
    <section className="w-full flex flex-col items-center justify-start pb-12">
      <div className="max-w-3xl text-center px-4">
        <h2 className="text-3xl font-semibold text-[#333333]">
          Our Latest Creations
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          A visual collection of our most recent works – each piece crafted with
          intention, emotion, and style.
        </p>
      </div>

      {/* Desktop / pointer devices — hover to expand */}
      <div className="hidden md:flex items-center gap-2 h-[400px] w-full max-w-5xl mt-10 px-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover object-center"
              src={src}
              alt={`Latest creation ${idx + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Touch fallback — horizontal scroller */}
      <div className="md:hidden flex gap-3 overflow-x-auto w-full px-4 mt-8 pb-2 snap-x snap-mandatory">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative shrink-0 w-64 h-64 rounded-lg overflow-hidden snap-start"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover object-center"
              src={src}
              alt={`Latest creation ${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
