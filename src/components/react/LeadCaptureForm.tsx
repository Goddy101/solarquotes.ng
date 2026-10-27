import { useState, useTransition } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const WHATSAPP_NUMBER = '2349168399707'; 

interface LeadFormProps {
  prefillService: string;
  prefillDistrict: string;
}

export default function LeadCaptureForm({ prefillService, prefillDistrict }: LeadFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isResidential = prefillService.toLowerCase().includes('residential');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const clientName = formData.get('clientName') as string;
    const rawPhone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const buildingSize = formData.get('buildingSize') as string;
    const monthlySpend = formData.get('monthlySpend') as string;
    
    // ==========================================
    // ADVANCED NIGERIAN PHONE NORMALIZATION
    // ==========================================
    let cleanPhone = rawPhone.replace(/\D/g, ''); 

    if (cleanPhone.startsWith('2340')) {
      cleanPhone = '234' + cleanPhone.substring(4);
    } else if (cleanPhone.startsWith('0')) {
      cleanPhone = '234' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('234') && cleanPhone.length === 10) {
      cleanPhone = '234' + cleanPhone;
    }

    if (cleanPhone.length !== 13) {
      setError('Please enter a valid 11-digit Nigerian phone number.');
      return; 
    }
    // ==========================================
    
    // Injecting the new fields into the JSONB metadata column
    const payload = {
      facility_name: clientName.trim(), 
      client_phone: cleanPhone,
      service_type: prefillService,
      geo_location: prefillDistrict,
      metadata: {
        email: email.trim(),
        building_size: buildingSize,
        monthly_spend: monthlySpend
      }
    };

    startTransition(async () => {
      try {
        // 1. DIRECT SUPABASE INSERT
        const { error: dbError } = await supabase
          .from('leads')
          .insert([payload]);

        if (dbError) throw new Error(dbError.message);
        
        // 2. INSTANT WHATSAPP REDIRECT (With Enriched Data)
        const encodedMessage = encodeURIComponent(
          `*New ${isResidential ? 'Residential' : 'Commercial'} Lead from Website*\n\n` +
          `*Location:* ${prefillDistrict}\n` +
          `*Service:* ${prefillService}\n\n` +
          `*Name:* ${clientName.trim()}\n` +
          `*Phone:* +${cleanPhone}\n` +
          `*Email:* ${email.trim()}\n` +
          `*Size/Type:* ${buildingSize}\n` +
          `*Monthly Spend:* ${monthlySpend}`
        );
        
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.location.href = whatsappUrl;
        
      } catch (err) {
        console.error("Supabase Insert Error:", err);
        setError('Network error. Please tap the WhatsApp icon directly to chat with us.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div role="alert" className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="clientName" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          {isResidential ? "Your Name / Estate" : "Facility / Business Name"}
        </label>
        <input 
          required 
          type="text" 
          name="clientName" 
          id="clientName"
          placeholder={isResidential ? "e.g. John Doe (Gwarinpa Estate)" : "e.g. Cedarcrest Hospitals"}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2.5 bg-gray-50 text-gray-900 transition-colors text-sm" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            WhatsApp Number
          </label>
          <input 
            required 
            type="tel" 
            name="phone" 
            id="phone"
            placeholder="0803 000 0000"
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2.5 bg-gray-50 text-gray-900 transition-colors text-sm" 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Corporate / Personal Email
          </label>
          <input 
            required 
            type="email" 
            name="email" 
            id="email"
            placeholder="name@company.com"
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2.5 bg-gray-50 text-gray-900 transition-colors text-sm" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="buildingSize" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            {isResidential ? "Property Size" : "Facility Type"}
          </label>
          <select 
            required 
            name="buildingSize" 
            id="buildingSize"
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2.5 bg-gray-50 text-gray-900 transition-colors text-sm"
          >
            <option value="">Select option...</option>
            {isResidential ? (
              <>
                <option value="3-4 Bedroom Flat">3-4 Bedroom Flat</option>
                <option value="5+ Bedroom Duplex">5+ Bedroom Duplex</option>
                <option value="Entire Estate/Compound">Entire Estate/Compound</option>
              </>
            ) : (
              <>
                <option value="Office Plaza / HQ">Office Plaza / HQ</option>
                <option value="Hospital / Clinic">Hospital / Clinic</option>
                <option value="Factory / Manufacturing">Factory / Manufacturing</option>
                <option value="Retail Mall / Supermarket">Retail Mall / Supermarket</option>
                <option value="Hotel / Hospitality">Hotel / Hospitality</option>
              </>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="monthlySpend" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Avg. Monthly Power/Diesel Bill
          </label>
          <select 
            required 
            name="monthlySpend" 
            id="monthlySpend"
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2.5 bg-gray-50 text-gray-900 transition-colors text-sm"
          >
            <option value="">Select range...</option>
            {isResidential ? (
              <>
                <option value="Under ₦50,000">Under ₦50,000</option>
                <option value="₦50,000 - ₦150,000">₦50,000 - ₦150,000</option>
                <option value="₦150,000 - ₦300,000">₦150,000 - ₦300,000</option>
                <option value="Over ₦300,000">Over ₦300,000</option>
              </>
            ) : (
              <>
                <option value="Under ₦500,000">Under ₦500,000</option>
                <option value="₦500,000 - ₦2,000,000">₦500,000 - ₦2,000,000</option>
                <option value="₦2,000,000 - ₦5,000,000">₦2,000,000 - ₦5,000,000</option>
                <option value="Over ₦5,000,000">Over ₦5,000,000</option>
              </>
            )}
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full flex justify-center items-center py-3.5 px-4 mt-2 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Routing to Engineering Desk...
          </span>
        ) : (
          isResidential ? "Get Home Solar Quote" : "Request Commercial Audit"
        )}
      </button>
      
      <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
        </svg>
        Data secured via SSL & End-to-End Encryption.
      </p>
    </form>
  );
}