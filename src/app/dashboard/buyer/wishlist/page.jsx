import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchWishlist } from "@/lib/fetch";
import Wishlist from "@/components/dashboard/buyer/WishList";

const WishlistPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const wishlistItems = await fetchWishlist(userId);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Wishlist items={wishlistItems} />
    </div>
  );
};

export default WishlistPage;
