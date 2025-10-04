import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";

// Server component that displays the current user's watchlist symbols.
// Keeps implementation minimal and fails gracefully when unauthenticated or empty.
const Watchlist = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const email = session?.user?.email || "";

    const symbols = email
      ? await getWatchlistSymbolsByEmail(email)
      : ([] as string[]);

    if (!symbols || symbols.length === 0) {
      return (
        <section className="watchlist-empty-container">
          <div className="watchlist-empty">
            <h2 className="text-xl font-semibold text-gray-200 mb-2">
              Your Watchlist is empty
            </h2>
            <p className="text-gray-400">
              Use the star or &#34;Add to Watchlist&#34; button on a stock page
              to save it here.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section className="watchlist-container">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Your Watchlist
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {symbols.map((sym) => (
            <li key={sym} className="watchlist">
              <Link
                href={`/stocks/${encodeURIComponent(sym)}`}
                className="block rounded-md border border-gray-800/60 bg-[#0f0f0f] px-4 py-3 hover:border-yellow-500/60 hover:bg-[#121212] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-200 font-medium">{sym}</span>
                  <span className="text-xs text-gray-500">View details →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  } catch (e) {
    console.error("Watchlist component error:", e);
    return (
      <section className="watchlist-empty-container">
        <div className="watchlist-empty">
          <h2 className="text-xl font-semibold text-gray-200 mb-2">
            Unable to load your Watchlist
          </h2>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </section>
    );
  }
};

export default Watchlist;
