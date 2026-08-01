export default function PromoBanner() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-hover p-6 text-white">
      <p className="text-lg font-bold">Vous êtes artisan ?</p>
      <p className="mt-1 text-sm text-white/80">
        Rejoignez plus de 300 professionnels déjà inscrits sur ProxiServices.
      </p>
      <button className="mt-4 rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-white">
        Devenir prestataire
      </button>
    </section>
  );
}