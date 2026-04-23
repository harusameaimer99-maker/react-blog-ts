import { useState } from 'react';
import { ContactForm } from '../Type.tsx';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}



export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {}; 

    if (!form.name) newErrors.name = '名前は必須です。';
    else if (form.name.length > 30) newErrors.name = '名前は30文字以内で入力してください。';

    if (!form.email) newErrors.email = 'メールアドレスは必須です。';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = '有効なメールアドレスを入力してください。';

    if (!form.message) newErrors.message = '本文は必須です。';
    else if (form.message.length > 500) newErrors.message = '本文は500文字以内で入力してください。';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;


  const requestBody: ContactForm = {
    name: form.name,
    email: form.email,
    message: form.message
  };


    setIsSubmitting(true);
    try {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (res.ok) {
        alert("送信しました");
        setForm({ name: '', email: '', message: '' });
        setErrors({});
      }
    } catch (error) {
      alert("送信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>名前</label><br />
        <input 
          value={form.name} 
          onChange={(e) => setForm({...form, name: e.target.value})} 
          disabled={isSubmitting} 
        />
        {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>メールアドレス</label><br />
        <input 
          type="email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})} 
          disabled={isSubmitting} 
        />
        {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>本文</label><br />
        <textarea 
          value={form.message}
          onChange={(e) => setForm({...form, message: e.target.value})} 
          disabled={isSubmitting} 
        />
        {errors.message && <p style={{color: 'red'}}>{errors.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} style={{ marginTop: '10px' }}>
        {isSubmitting ? '送信中...' : '送信'}
      </button>
    </form>
  );
}