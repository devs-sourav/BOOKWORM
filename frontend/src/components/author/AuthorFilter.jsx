import Link from "next/link";
import { useSearchParams } from "next/navigation";

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0-9"];

const AuthorFilter = () => {
  const searchParams = useSearchParams();
  const activeLetter = searchParams.get("first_letter");

  return (
    <ul className="flex flex-wrap gap-2 justify-center mb-6">
      <li>
        <Link
          href="/authors"
          className={`px-3 py-1 rounded ${
            !activeLetter
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          All
        </Link>
      </li>
      {alphabet.map((letter) => (
        <li key={letter}>
          <Link
            href={`/authors?first_letter=${letter}`}
            className={`px-3 py-1 rounded ${
              activeLetter === letter
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {letter}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AuthorFilter;
