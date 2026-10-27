import { useState, useTransition } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client (Public keys are safe here due to RLS policies)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Your WhatsApp Business Number (in international format, no '+')
const WHATSAPP_NUMBER = '+234 916 839 9707'; // <-- Replace with your actual number

interface LeadFormProps {
  prefillService: string;
  prefillDistrict: string;
}

export default function LeadCaptureForm({ prefillService, prefillDistrict }: LeadFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Dynamic Market Detection
  const isResidential = prefillService.toLowerCase().includes('residential');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const rawPhone = formData.get('phone') as string;
    const clientName = formData.get('clientName') as string;
    
    // Nigerian Phone Normalization
    let cleanPhone = rawPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '234' + cleanPhone.substring(1);
    }
    
    const payload = {
      facility_name: clientName.trim(), 
      phone: cleanPhone,
      service_requested: prefillService,
      district: prefillDistrict,
    };

    startTransition(async () => {
      try {
        // 1. DIRECT SUPABASE INSERT
        const { error: dbError } = await supabase
          .from('leads')
          .insert([payload]);

        if (dbError) throw new Error(dbError.message);
        
        // 2. INSTANT WHATSAPP REDIRECT
        // Craft a hyper-personalized opening message for the WhatsApp chat
        const encodedMessage = encodeURIComponent(
          `Hi, I need a ${isResidential ? 'home quote' : 'commercial audit'} for a ${prefillService} system in ${prefillDistrict}.\n\nName: ${clientName.trim()}\nPhone: ${cleanPhone}`
        );
        
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.location.href = whatsappUrl;
        
      } catch (err) {
        console.error(err);
        setError('Network error. Please tap the WhatsApp icon directly to chat with us.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div role="alert" className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="clientName" className="block text-sm font-semibold text-gray-700 mb-1">
          {isResidential ? "Your Name / Estate Name" : "Facility / Business Name"}
        </label>
        <input 
          required 
          type="text" 
          name="clientName" 
          id="clientName"
          placeholder={isResidential ? "e.g. John Doe (Gwarinpa Estate)" : "e.g. Cedarcrest Hospitals"}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 bg-gray-50 text-gray-900 transition-colors" 
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
          Your WhatsApp Number
        </label>
        <input 
          required 
          type="tel" 
          name="phone" 
          id="phone"
          placeholder="0803 000 0000"
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 bg-gray-50 text-gray-900 transition-colors" 
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting to WhatsApp...
          </span>
        ) : (
          isResidential ? "Get Home Solar Quote" : "Request Commercial Audit"
        )}
      </button>
      
      <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
        </svg>
        Data secured via SSL.
      </p>
    </form>
  );
}