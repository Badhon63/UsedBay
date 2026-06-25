"use client";

export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      name: "Md. Rakib Hasan",
      role: "Buyer",
      comment:
        "Found an amazing laptop at half the price. The seller was very cooperative and the product condition was exactly as described. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "Seller",
      comment:
        "UsedBay made it easy to sell my old furniture. Got genuine buyers and completed the sale within a week. Great platform!",
      rating: 5,
    },
    {
      id: 3,
      name: "Ahmed Khan",
      role: "Buyer",
      comment:
        "Purchased a mobile phone and it works perfectly. The platform is secure and the payment process was smooth.",
      rating: 5,
    },
    {
      id: 4,
      name: "Fatima Begum",
      role: "Seller",
      comment:
        "Sold my vehicle through UsedBay. The verification process gave me confidence and I found serious buyers quickly.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Success Stories
          </h2>
          <p className="text-gray-600">Real stories from our satisfied users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-lg">
                    {story.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(story.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700">{story.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
