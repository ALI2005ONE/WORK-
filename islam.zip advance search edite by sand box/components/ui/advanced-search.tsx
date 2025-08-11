"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AdvancedSearchProps {
  className?: string;
}

export function AdvancedSearch({ className = "" }: AdvancedSearchProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const categories = [
    { value: "all", label: "الكل" },
    { value: "rulings", label: "الأحكام" },
    { value: "hadith", label: "الأحاديث" },
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    router.push(
      `/search?term=${encodeURIComponent(
        searchTerm
      )}&category=${encodeURIComponent(category)}`
    );

    setSearchTerm("");
    setCategory("all");
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}
    >
      <input
        type="text"
        placeholder="أدخل كلمات البحث..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-auto flex-grow"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-48"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        disabled={!searchTerm.trim()}
        className="bg-blue-600 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        بحث
      </button>
    </div>
  );
}
