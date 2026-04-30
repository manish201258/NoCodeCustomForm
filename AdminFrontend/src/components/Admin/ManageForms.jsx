import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageForms() {
  const [forms, setForms] = useState([]);

  const fetchForms = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/forms`);
    const data = await res.json();
    setForms(data);
  };

  const deleteForm = async (id) => {
    if (!confirm('Delete this form?')) return;
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/forms/${id}`, { method: "DELETE" });
    fetchForms();
  };

  useEffect(() => { fetchForms(); }, []);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Manage Forms</h3>
        <p className="text-sm text-gray-600">View, open, or delete your saved forms.</p>
      </div>

      {forms.length === 0 ? (
        <div className="py-8 flex items-center justify-center">
          <div className="text-sm text-gray-500">No forms available.</div>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {forms.map((form) => (
            <div key={form._id} className="p-4 bg-white border border-gray-100 rounded-lg flex items-center justify-between shadow-sm hover:shadow-md transition">
              <div>
                <div className="font-medium text-gray-800">{form.title || 'Untitled form'}</div>
                {form.description && <div className="text-xs text-gray-500">{form.description}</div>}
              </div>

              <div className="flex items-center gap-3">
                <Link to={`/form/${form._id}?view=readonly`} target="_blank" className="text-sm px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded hover:bg-indigo-100">View</Link>
                <button onClick={() => deleteForm(form._id)} className="text-sm px-3 py-1 text-red-600 rounded hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}