export function Card({ children }: { children: React.ReactNode}) {
    return <div className="bg-white max-w-md w-full p-10 rounded-md">{children}</div>;
  }