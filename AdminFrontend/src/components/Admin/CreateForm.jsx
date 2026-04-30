import { useState } from "react";
import FieldItem from "./FieldItem";

export default function CreateForm() {
  const [form, setForm] = useState({ title: "", fields: [] });
  const [saving, setSaving] = useState(false);

  const addField = (type) => {
    setForm((f) => ({
      ...f,
      fields: [
        ...f.fields,
        { id: Date.now().toString(), label: "", type, options: [], required: false },
      ],
    }));
  };

  const saveForm = async () => {
    setSaving(true);
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/forms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Form Saved!");
      setForm({ title: "", fields: [] });
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">

      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-2">
        Create Form
      </h2>
      <p className="text-gray-500 text-sm text-center mb-6">
        Build your custom form
      </p>

      {/* Form Title Input */}
      <label className="block text-sm font-semibold mb-1">
        Form Title
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Enter form title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* Add Field Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => addField("text")} className="px-3 py-1 bg-white text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition">Text</button>
        <button onClick={() => addField("textarea")} className="px-3 py-1 bg-white text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition">Textarea</button>
        <button onClick={() => addField("select")} className="px-3 py-1 bg-white text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition">Select</button>
        <button onClick={() => addField("checkbox")} className="px-3 py-1 bg-white text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition">Checkbox</button>
        <button onClick={() => addField("radio")} className="px-3 py-1 bg-white text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition">Radio</button>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {form.fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-lg bg-gray-50">
            <FieldItem
              field={field}
              index={index}
              form={form}
              setForm={setForm}
            />
          </div>
        ))}
      </div>


      <button
        onClick={saveForm}
        disabled={saving}
        className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-shadow"
      >
        {saving ? "Saving…" : "Save Form"}
      </button>
    </div>
  );
}