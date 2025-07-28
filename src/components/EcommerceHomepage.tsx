import React from "react";
import { Search, ShoppingBag, User, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  image: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  subtitle,
  image,
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg group cursor-pointer ${className}`}
    >
      <Link href="/category">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
        <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white text-3xl md:text-4xl font-bold leading-tight">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 group-hover:bg-opacity-30 transition-all duration-300">
              <ChevronRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const EcommerceHomepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        {/* <div className="flex items-center justify-between h-16"> */}
        {/* Logo */}
        {/* <div className="flex-shrink-0">
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
            </div> */}

        {/* Search Bar */}
        {/* <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div> */}

        {/* Right Side */}
        {/* <div className="flex items-center space-x-4"> */}
        {/* Country Selector */}
        {/* <div className="flex items-center space-x-1 bg-black text-white px-3 py-1 rounded text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>NGN</span>
              </div> */}

        {/* Shopping Bag */}
        {/* <div className="relative">
                <ShoppingBag className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div> */}

        {/* User Avatar */}
        {/* <div className="w-8 h-8 bg-gray-300 rounded-full"></div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}

        {/* Navigation */}
        <nav className="border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center max-md:hidden items-center space-x-8">
              {[
                "NEW ARRIVAL",
                "MOST PICKED",
                "SHOP",
                // 'WOMEN',
                // 'MEN',
                // 'SNEAKERS',
                "GADGETS",
                "APPLIANCES",
                "CONTACT US",
              ].map((item) => (
                <a
                  key={item}
                  href={`${
                    item === "CONTACT US" ? "/contact-us" : "/category"
                  }`}
                  className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap text-sm font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl max-md:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex max-md:flex-col lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
          {/* Winter Arrival - Large Card */}
          <CategoryCard
            title="Winter Arrival"
            subtitle="Of Outfit"
            image="/images/Winter.png"
            className="w-2/3 max-md:w-full lg:row-span-2"
          />

          {/* Top Cosmetics */}
          <CategoryCard
            title="Top"
            subtitle="Cosmetics"
            image="/images/Cosmetics.png"
            className="w-1/3 max-md:w-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Gadgets On The Go */}
          <CategoryCard
            title="Gadgets"
            subtitle="On The Go"
            image="/images/Gadgets.png"
            className="h-[300px]"
          />

          {/* Sport Footwear */}
          <CategoryCard
            title="Sport"
            subtitle="Footwear"
            image="/images/Sport.png"
            className="h-[300px]"
          />
        </div>
      </main>
    </div>
  );
};

export default EcommerceHomepage;
