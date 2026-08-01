import { Menu, Bell } from "lucide-react";

export default function Header({ userName = "Franck" }) {
  return (
    <section
      className="relative w-full overflow-hidden pb-14 pt-6 px-6 text-white"
      style={{
        height: "290px",
        background: "linear-gradient(160deg, #2FA866 0%, #166534 100%)",
      }}
    >
      {/* Cercles décoratifs — blanc 8% */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-white/[0.08]"></div>
        <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-white/[0.08]"></div>
      </div>

      {/* Silhouette skyline — blanc 16% */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/[0.16]" style={{
        clipPath: "polygon(0% 100%, 0% 40%, 8% 40%, 8% 60%, 16% 60%, 16% 20%, 24% 20%, 24% 70%, 32% 70%, 32% 30%, 42% 30%, 42% 80%, 52% 80%, 52% 10%, 62% 10%, 62% 60%, 72% 60%, 72% 40%, 82% 40%, 82% 90%, 92% 90%, 92% 50%, 100% 50%, 100% 100%)"
      }}></div>

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <button className="rounded-xl bg-white/25 border border-white/60 p-3" style={{ borderWidth: "1.5px" }}>
          <Menu size={22} className="text-white" />
        </button>
        <div className="flex items-center gap-3">
          <button className="relative rounded-xl p-2 text-white">
            <Bell size={22} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary"></span>
          </button>
          <div className="h-10 w-10 rounded-full bg-white/25 border border-white/60" style={{ borderWidth: "1.5px" }}>
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="avatar"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Texte */}
      <div className="relative mt-6">
        <p className="text-lg font-medium text-white">Bonjour {userName} 👋</p>
        <h1 className="mt-2 max-w-xs text-3xl font-extrabold leading-tight text-white">
          Trouvez le professionnel qu'il vous faut
        </h1>
      </div>
    </section>
  );
}