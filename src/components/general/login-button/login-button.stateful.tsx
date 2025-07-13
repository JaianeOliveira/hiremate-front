import GoogleIcon from "@public/icons/google.svg";
import Image from "next/image";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
      className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-semibold border-neutral-500 text-neutral-600 hover:ring-2 hover:border-neutral-600 hover:ring-neutral-300 dark:text-neutral-200 dark:border-neutral-400 hover:dark:ring-neutral-800 hover:dark:border-neutral-600 transition-all duration-300 cursor-pointer"
    >
      <Image src={GoogleIcon} height={24} width={24} alt="Google  icon" />
      <span> Login com o google</span>
    </Link>
  );
};
