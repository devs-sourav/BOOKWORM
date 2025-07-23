"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "../shared/Container";

export default function Breadcrumb({ items }) {
  return (
    <nav className="text-sm py-4 border-b border-t text-gray-300">
      <Container>
        <ol className="flex items-center space-x-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index !== 0 && (
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
              )}

              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:underline text-gray-800"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
