import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserPage() {
  const [forms, setForms] = useState([]);

  const fetchForms = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/forms`);
      const data = await res.json();
      setForms(data);
    } catch (err) {
      console.error('Failed to load forms', err);
    }
  };

  useEffect(() => { fetchForms(); }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Available Forms</h2>
          <p className="text-sm text-gray-600">Choose a form to fill and submit your response.</p>
        </div>

        {forms.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No forms available right now.</div>
        ) : (
          <div className="grid gap-4">
            {forms.map((f) => (
              <div key={f._id} className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{f.title || 'Untitled form'}</div>
                  {f.description && <div className="text-xs text-gray-500">{f.description}</div>}
                </div>
                <Link to={`/form/${f._id}`} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">Open</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
