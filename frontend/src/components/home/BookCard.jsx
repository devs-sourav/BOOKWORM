import Image from "next/image";

export default function BookCard({ imageSrc, format, title, author, price, originalPrice }) {
  return (
    <div className="flex bg-white flex-col h-[407px] border-r border-r-gray-200 md:flex-row items-start gap-6  p-10">
      {/* Book Image */}
      <div className="w-full h-full md:w-[200px]">
        <Image
          src={imageSrc}
          alt={title}
          width={300}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Book Info */}
      <div>
        <p className="text-sm uppercase text-red-500 font-semibold">{format}</p>
        <h2 className="text-xl font-semibold mt-1">{title}</h2>
        <p className="text-gray-500 mt-1">{author}</p>
        <p className="text-lg font-semibold mt-2">
          ${price}
          {originalPrice && (
            <span className="line-through text-gray-400 text-sm ml-2">${originalPrice}</span>
          )}
        </p>
      </div>
    </div>
  );
}
