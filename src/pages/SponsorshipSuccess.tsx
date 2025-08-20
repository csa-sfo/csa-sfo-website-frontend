import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

export default function SponsorshipSuccess() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const paymentIntent = searchParams.get('payment_intent');
    
    if (!sessionId) {
      setError('No session ID found');
      setIsLoading(false);
      return;
    }

    // Set payment intent ID if available
    if (paymentIntent) {
      setPaymentIntentId(paymentIntent);
      fetchInvoiceUrl(paymentIntent);
    } else {
      // If no payment_intent in URL, try to get it from session
      fetchSessionDetails(sessionId);
    }

    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const fetchSessionDetails = async (sessionId: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PROD_API_URL}/api/v1/payments/session/${sessionId}`);
      if (response.data && response.data.payment_intent) {
        setPaymentIntentId(response.data.payment_intent);
        fetchInvoiceUrl(response.data.payment_intent);
      } else {
        console.warn('No payment intent found in session data:', response.data);
        toast.warning('Payment details are still processing. Please check back later.');
      }
    } catch (error) {
      console.error('Error fetching session details:', error);
      // Provide more specific error message
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with an error status code
          toast.error(`Error: ${error.response.data?.detail || 'Failed to load payment details'}`);
        } else if (error.request) {
          // Request was made but no response received
          toast.error('Unable to connect to the server. Please check your connection.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const fetchInvoiceUrl = async (intentId: string) => {
    if (!intentId) {
      console.warn('No payment intent ID provided for invoice URL');
      return;
    }
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_PROD_API_URL}/api/v1/payments/get-invoice-url`, {
        params: { payment_intent_id: intentId }
      });
      
      if (response.data.url) {
        setInvoiceUrl(response.data.url);
      } else {
        toast.warning(response.data.message || 'Invoice/receipt not available yet.');
      }
    } catch (error) {
      console.error('Error fetching invoice URL:', error);
      // Show a more specific error message if available
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          toast.error('Invoice not found. It may take a moment to generate. Please check your email.');
        } else {
          toast.error(`Error loading invoice: ${error.response.data.detail || 'Please try again later.'}`);
        }
      } else {
        toast.error('Could not load invoice. Please check your email for the receipt.');
      }
    }
  };

  const handleDownloadInvoice = async () => {
    if (!invoiceUrl) return;
    
    setIsDownloading(true);
    try {
      // Open the invoice in a new tab for download
      window.open(invoiceUrl, '_blank');
      toast.success('Invoice download started');
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast.error('Failed to download invoice');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="mt-3 text-lg font-medium text-gray-900">Payment Error</h2>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <Button 
            onClick={() => navigate('/sponsorship')}
            className="mt-4"
          >
            Return to Sponsorship
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h2>
        <p className="mt-2 text-gray-600">
          Thank you for your sponsorship. A receipt has been sent to your email.
        </p>
        <div className="mt-6 space-y-3">
          {invoiceUrl && (
            <Button 
              onClick={handleDownloadInvoice}
              variant="outline"
              className="w-full"
              disabled={isDownloading}
            >
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? 'Downloading...' : 'Download Invoice'}
            </Button>
          )}
          <Button 
            onClick={() => navigate('/sponsorship')}
            className="w-full"
          >
            Return to Sponsorship Page
          </Button>
        </div>
      </div>
    </div>
  );
}
