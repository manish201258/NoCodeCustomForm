import React from 'react'

export default function Sidebar({ active, setActive }) {
  const items = [
    { id: 'responses', label: 'Responses' },
    { id: 'create', label: 'Create Form' },
    { id: 'manage', label: 'Manage Forms' },
  ];

  return (
    <aside className="w-64 border-r min-h-screen p-4 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-center">Admin Panel</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className={`text-left px-3 py-2 rounded ${active === it.id ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
