import { useParams, Link, useLocation } from "react-router-dom";
import FormRenderer from "../components/User/FormRenderer";

export default function FormPage() {
  const { id } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const readOnly = params.get('view') === 'readonly';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      {/* Form Card */}
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{readOnly ? 'Form Preview' : 'Fill Form'}</h1>
          <p className="text-sm text-gray-500 mt-1">{readOnly ? 'Preview only.' : 'Please provide your details below. Fields marked with * are required.'}</p>
        </div>

        {/* Back Button */}
        <div className="mb-4 text-right">
          <Link to="/" className="text-sm text-blue-600 hover:underline">Back</Link>
        </div>

        {/* Form Content */}
        <FormRenderer formId={id} readOnly={readOnly} />

      </div>
    </div>
  );
}