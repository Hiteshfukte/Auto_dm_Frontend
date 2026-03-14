export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing and using our Instagram Automation application ("Service"), you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              Our Service provides automated direct messaging functionalities in response to public comments 
              made on specific Instagram posts/Reels associated with your connected Business Account.
              We rely on Meta's official APIs to deliver this functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Meta Platform Policies Compliance</h2>
            <p>
              By using our Service, you agree to comply with all applicable Meta Platform Terms and Developer Policies. 
              You may only use our tools to send content that complies with Instagram's Community Guidelines. 
              Automated behavior that violates Meta's spam policies may result in your Meta account being restricted.
              We are not responsible for account bans resulting from misuse of our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Limitation of Liability</h2>
            <p>
              In no event shall the Service providers or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on our Service, even if we have been notified 
              orally or in writing of the possibility of such damage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
