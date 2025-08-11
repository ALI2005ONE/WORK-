// app/search/page.tsx

import React from "react";

interface SearchResult {
  id: string;
  title: string;
  description?: string;
}

// Helper to fetch search results (replace with your real API)
async function fetchSearchResults(
  term: string,
  category: string
): Promise<SearchResult[]> {
  // Example: simulate fetch delay and filtered results
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Dummy data for demonstration
  const dummyData: SearchResult[] = [
    { id: "1", title: "Result One", description: "Description of result one." },
    { id: "2", title: "Result Two", description: "Description of result two." },
    {
      id: "3",
      title: "Result Three",
      description: "Description of result three.",
    },
  ];

  // Filter dummy data by term and category (simple contains match)
  return dummyData.filter(
    (item) =>
      item.title.toLowerCase().includes(term.toLowerCase()) &&
      (category === "all" ||
        category === "" ||
        item.title.toLowerCase().includes(category.toLowerCase()))
  );
}

interface Props {
  searchParams: {
    term?: string;
    category?: string;
  };
}

export default async function SearchResultsPage({ searchParams }: Props) {
  const term = searchParams.term ?? "";
  const category = searchParams.category ?? "all";

  // Fetch results on the server
  const results = term ? await fetchSearchResults(term, category) : [];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        نتائج البحث عن: <span className="text-primary">{term || "..."}</span> في
        الفئة: <span className="text-primary">{category}</span>
      </h1>

      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((item) => (
            <li
              key={item.id}
              className="border rounded p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              {item.description && (
                <p className="mt-2 text-gray-600">{item.description}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">لا توجد نتائج مطابقة.</p>
      )}
    </main>
  );
}
