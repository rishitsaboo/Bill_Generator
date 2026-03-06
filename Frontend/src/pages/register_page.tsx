import Register from "../components/Register";

export default function LoginPage() {
  const isDesktop = window.innerWidth >= 768;

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${
          isDesktop
            ? "/images/Login/desktop.png"
            : "/images/Login/mobile.png"
        })`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center px-4">
        < Register/>
      </div>
    </div>
  );
}
