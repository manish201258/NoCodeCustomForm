import { useState } from 'react'
import Sidebar from '../components/Admin/Sidebar'
import CreateForm from '../components/Admin/CreateForm'
import ManageForms from '../components/Admin/ManageForms'
import Responses from '../components/Admin/Responses'

export default function AdminPage() {
  const [view, setView] = useState('responses')

  return (
    <div className="flex">
      <Sidebar active={view} setActive={setView} />

      <main className="flex-1 p-6 bg-gray-50 min-h-screen" style={{backgroundColor:'#c2c0b3a1'}}>

        {view === 'responses' && (
            <div className="max-w-4xl mx-auto">
              <Responses />
            </div>
          )}
        {view === 'create' && (
          <div className="max-w-3xl mx-auto">
            <CreateForm />
          </div>
        )}

        {view === 'manage' && (
          <div className="max-w-3xl mx-auto">
            <ManageForms />
          </div>
        )}

      </main>
    </div>
  )
}