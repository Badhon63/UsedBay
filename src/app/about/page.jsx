import Link from "next/link";

const AboutPage = () => {
  const team = [
    { name: "Rakib Hasan", role: "Founder & CEO", initial: "R" },
    { name: "Nusrat Jahan", role: "Head of Operations", initial: "N" },
    { name: "Ahmed Khan", role: "Lead Developer", initial: "A" },
    { name: "Fatima Begum", role: "Product Designer", initial: "F" },
  ];

  const values = [
    { icon: "🤝", title: "Trust", desc: "We build trust between buyers and sellers through verified listings and secure payments." },
    { icon: "🌿", title: "Sustainability", desc: "Every purchase on UsedBay helps reduce waste and promotes sustainable consumption." },
    { icon: "💰", title: "Affordability", desc: "We make quality products accessible to everyone at affordable prices." },
    { icon: "🔒", title: "Security", desc: "Your data and transactions are protected with industry-standard security." },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-50 to-teal-100 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About UsedBay</h1>
          <p className="text-xl text-gray-600 mb-8">
            Bangladesh&apos;s most trusted second-hand marketplace. We connect buyers and sellers to promote affordable, sustainable shopping.
          </p>
          <Link href="/products" className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
            Browse Products
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                UsedBay was founded with a simple mission: to make second-hand shopping safe, easy, and accessible for everyone in Bangladesh.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that every product has more life to give. By connecting people who want to sell unused items with buyers looking for affordable alternatives, we create a win-win marketplace that benefits everyone — including the planet.
              </p>
              <p className="text-gray-600">
                Since our launch, we&apos;ve helped thousands of Bangladeshis save money, earn extra income, and reduce waste together.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "10,000+", label: "Happy Users" },
                { value: "5,000+", label: "Products Listed" },
                { value: "8,500+", label: "Completed Sales" },
                { value: "50+", label: "Tons of Waste Saved" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-teal-600 mb-1">{value}</p>
                  <p className="text-sm text-gray-600">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Our Values</h2>
          <p className="text-gray-600 text-center mb-12">What drives us every day</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Our Team</h2>
          <p className="text-gray-600 text-center mb-12">The people behind UsedBay</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, initial }) => (
              <div key={name} className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-bold text-2xl">{initial}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to join UsedBay?</h2>
          <p className="text-teal-100 mb-8">Start buying or selling today. It&apos;s free to join!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started
            </Link>
            <Link href="/products" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;