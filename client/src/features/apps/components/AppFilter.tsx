import React from 'react';
import './AppFilter.css';

export interface AppFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const AppFilter: React.FC<AppFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const allCategories = ['All', ...categories];

  return (
    <div className="filter-bar" role="toolbar" aria-label="Filter apps by category">
      {allCategories.map((cat) => {
        const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            type="button"
            className={`filter-pill ${isActive ? 'is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

