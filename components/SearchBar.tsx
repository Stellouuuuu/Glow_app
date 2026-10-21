"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Icon from "./Icon";

function SearchForm() {
  const router = useRouter();
  const [value, setValue] = useState(useSearchParams().get("q") ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/?q=${encodeURIComponent(q)}#bestsellers` : "/#bestsellers");
  }

  return (
    <form className="search-form" onSubmit={onSubmit} role="search">
      <input
        type="search"
        placeholder="Rechercher un produit..."
        aria-label="Rechercher un produit"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" aria-label="Lancer la recherche">
        <Icon name="i-search" />
      </button>
    </form>
  );
}

export default function SearchBar() {
  return (
    <div className="search-box">
      <Suspense>
        <SearchForm />
      </Suspense>
    </div>
  );
}
