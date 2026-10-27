import { useState } from 'react';

export default function CandidateForm({ jobId, jobTitle, storeName }) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    weekendOk: true, experience: '1-3', cvUrl: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Appel API vers ta base Supabase
    await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, jobId })
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>🎉 Candidature envoyée !</h2>
        <p>Le gérant de {storeName} a bien reçu vos informations et vous contactera par SMS si votre profil correspond.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '1.5rem', fontFamily: 'sans-serif' }}>
      <h2>Postuler chez {storeName}</h2>
      <p style={{ color: '#666' }}>Poste : {jobTitle}</p>
      
      <label>Prénom</label>
      <input required type="text" style={inputStyle} onChange={e => setFormData({...formData, firstName: e.target.value})} />

      <label>Nom</label>
      <input required type="text" style={inputStyle} onChange={e => setFormData({...formData, lastName: e.target.value})} />

      <label>Téléphone Mobile</label>
      <input required type="tel" style={inputStyle} onChange={e => setFormData({...formData, phone: e.target.value})} />

      <label>Email</label>
      <input required type="email" style={inputStyle} onChange={e => setFormData({...formData, email: e.target.value})} />

      <label>Disponible le week-end et en soirée ?</label>
      <select style={inputStyle} onChange={e => setFormData({...formData, weekendOk: e.target.value === 'true'})}>
        <option value="true">Oui, tout à fait</option>
        <option value="false">Non</option>
      </select>

      <label>Expérience dans le domaine</label>
      <select style={inputStyle} onChange={e => setFormData({...formData, experience: e.target.value})}>
        <option value="0">Aucune expérience</option>
        <option value="<1">Moins d'un an</option>
        <option value="1-3">1 à 3 ans</option>
        <option value=">3">Plus de 3 ans</option>
      </select>

      <button type="submit" style={btnStyle}>Envoyer ma candidature en 1 clic 🚀</button>
    </form>
  );
}

const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '14px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' };
