import Link from "next/link";

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

interface LogoProps {
  text?: string;
  dark?: boolean;
}

export function Logo({
  text = "Logo Text",
  dark = false,
}: Readonly<LogoProps>) {
  return (
    <Link className="flex items-center gap-2" href="/">
      <MountainIcon className={"h-6 w-6  text-pink-500"} />
      <span
        className={`text-lg font-semibold ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {text}
      </span>
    </Link>
  );
}
