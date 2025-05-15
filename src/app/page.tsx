import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <Image 
            src="/assets/logo.svg"
            alt="SMART_MED Logo"
            width={220}
            height={50}
            className="mx-auto mb-4"
          />
        </div>
        
        <p className="text-xl mb-10 text-gray-700">
          A streamlined diabetes management system for monitoring health metrics,
          tracking medications, and visualizing family health history.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/login" 
            className="py-2 px-8 bg-[#24E5C6] hover:bg-[#20d6b8] text-white rounded-md font-medium"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="py-2 px-8 border border-[#24E5C6] text-[#24E5C6] hover:bg-[#24E5C6]/10 rounded-md font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
