"use client";

export default function SustainabilityImpact() {
  const impacts = [
    {
      id: 1,
      title: "Reduce Waste",
      description:
        "Every pre-owned item purchased prevents waste from going to landfills.",
      stat: "50+ tons",
    },
    {
      id: 2,
      title: "Save Resources",
      description:
        "Buying used products reduces the need for new manufacturing.",
      stat: "10,000+ kg",
    },
    {
      id: 3,
      title: "Lower Carbon Footprint",
      description:
        "Second-hand shopping significantly reduces carbon emissions.",
      stat: "5,000+ tons CO2",
    },
    {
      id: 4,
      title: "Affordable Living",
      description:
        "Get quality products at lower prices while helping the environment.",
      stat: "70% savings",
    },
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">
            Sustainability Impact
          </h2>
          <p className="text-gray-400">
            Make a difference by choosing second-hand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact) => (
            <div
              key={impact.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6"
            >
              <div className="text-3xl font-bold text-white mb-3">
                {impact.stat}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {impact.title}
              </h3>
              <p className="text-gray-400 text-sm">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
