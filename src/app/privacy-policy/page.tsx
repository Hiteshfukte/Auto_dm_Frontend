export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>
              When you use our Instagram Automation application, we collect information necessary to provide our services. 
              This includes your Facebook/Instagram profile information (Name, ID, Profile Picture) obtained via Meta's Graph API, 
              and the content of public comments on posts you choose to automate. We do not store your passwords.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>
              We use the collected information exclusively to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Authenticate your account using Facebook Login.</li>
              <li>Read incoming comments on your specified Instagram Reels.</li>
              <li>Send automated Direct Messages to users interacting with your content on your behalf.</li>
              <li>Provide analytics regarding the performance of your automated campaigns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal identification information to others. 
              Data is transmitted securely via Meta's official API endpoints. 
              We may disclose information if required by law or in response to valid requests by public authorities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Retention and Deletion</h2>
            <p>
              We retain your data only for as long as necessary to provide our automation services. 
              You can revoke our application's access at any time via your Facebook or Instagram security settings. 
              If you wish to delete your account and all associated data from our servers, please contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
