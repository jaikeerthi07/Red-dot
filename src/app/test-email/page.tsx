'use client';

import { useState } from 'react';

export default function TestEmailPage() {
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const testEmail = async () => {
    setIsSending(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message to verify email functionality.',
          service: 'Website Development',
          budget: '$5000-$10000',
          timeline: '2-3 months'
        }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to send test email' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Email Functionality Test
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Test the contact form email notifications
          </p>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Send Test Email
            </h2>
            <p className="text-gray-600 mb-6">
              Click the button below to send a test email to your configured email address.
            </p>
            
            <button
              onClick={testEmail}
              disabled={isSending}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {isSending ? 'Sending...' : 'Send Test Email'}
            </button>
            
            {result && (
              <div className={`mt-6 p-4 rounded-md ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <h3 className="text-lg font-medium">
                  {result.success ? 'Email Sent Successfully!' : 'Email Sending Failed'}
                </h3>
                <p className="mt-2">
                  {result.success 
                    ? 'Check your email inbox for the test message.' 
                    : result.error || 'An unknown error occurred.'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Email Configuration Instructions
          </h2>
          
          <div className="prose prose-amber max-w-none">
            <h3>Setting up Gmail for Email Notifications</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Enable 2-Factor Authentication</strong> on your Google account:
                <ul className="list-disc pl-5 mt-1">
                  <li>Go to your Google Account settings</li>
                  <li>Navigate to Security → 2-Step Verification</li>
                  <li>Follow the prompts to enable 2FA</li>
                </ul>
              </li>
              <li>
                <strong>Generate an App Password</strong>:
                <ul className="list-disc pl-5 mt-1">
                  <li>Go to <a href="https://myaccount.google.com/apppasswords" className="text-amber-600 hover:text-amber-800">https://myaccount.google.com/apppasswords</a></li>
                  <li>Sign in with your Google account</li>
                  <li>Select "Mail" as the app and "Other" as the device</li>
                  <li>Name it "REDDOT Website"</li>
                  <li>Copy the generated 16-character password</li>
                </ul>
              </li>
              <li>
                <strong>Update your .env.local file</strong>:
                <ul className="list-disc pl-5 mt-1">
                  <li>Open the .env.local file in your project</li>
                  <li>Replace <code>your_app_password_here</code> with the generated password</li>
                  <li>Save the file</li>
                </ul>
              </li>
              <li>
                <strong>Restart your development server</strong> for the changes to take effect
              </li>
            </ol>
            
            <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400">
              <h4 className="font-bold text-amber-800">Important Notes:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Your password is stored locally and never shared with anyone</li>
                <li>App passwords are more secure than regular passwords for this purpose</li>
                <li>Without a valid app password, emails will only be logged to the console</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}