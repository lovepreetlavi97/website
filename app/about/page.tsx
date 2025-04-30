import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About GIVA</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the story behind GIVA, where passion for craftsmanship meets contemporary design in silver jewelry.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative h-[400px]">
          <Image
            src="/images/about-story.jpg"
            alt="GIVA Jewelry Craftsmanship"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2019, GIVA was born from a vision to make premium quality silver jewelry accessible to everyone. 
            We believe that every piece of jewelry tells a story, and we&rsquo;re here to help you tell yours.
          </p>
          <p className="text-gray-600">
            Our artisans combine traditional craftsmanship with modern design sensibilities to create pieces that are 
            both timeless and contemporary. Each piece is crafted with meticulous attention to detail, ensuring the 
            highest quality standards.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Quality</h3>
            <p className="text-gray-600">
              We use only the finest materials and maintain strict quality control throughout our production process.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Innovation</h3>
            <p className="text-gray-600">
              We constantly push boundaries to create unique designs that blend traditional and contemporary styles.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We strive to provide exceptional service at every step.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={`/images/team-member-${member}.jpg`}
                  alt={`Team Member ${member}`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Team Member {member}</h3>
              <p className="text-gray-600">Position</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 