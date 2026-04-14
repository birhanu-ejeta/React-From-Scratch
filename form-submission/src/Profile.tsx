export type ProfileData = {
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  imageUrl: string;
  gender: string;
  lang: string[];
  country: string;
  bio: string;
};

type ProfileProps = {
  profile: ProfileData;
};

export default function Profile({ profile }: ProfileProps) {
  return (
    <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        Profile Summary
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Generated from your submitted form data.
      </p>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start">
        <img
          src={profile.imageUrl}
          alt={`${profile.firstname} ${profile.lastname}`}
          className="h-28 w-28 rounded-2xl border border-slate-300 object-cover shadow"
        />

        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Full Name
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {profile.firstname} {profile.lastname}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Email
            </p>
            <p className="mt-1 font-semibold text-slate-900">{profile.email}</p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Contact
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {profile.contact}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Gender
            </p>
            <p className="mt-1 font-semibold capitalize text-slate-900">
              {profile.gender}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-sm sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Country
            </p>
            <p className="mt-1 font-semibold capitalize text-slate-900">
              {profile.country}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-sm sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Best Subjects
            </p>
            <p className="mt-1 font-semibold capitalize text-slate-900">
              {profile.lang.length ? profile.lang.join(", ") : "-"}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-sm sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Bio
            </p>
            <p className="mt-1 leading-relaxed text-slate-800">{profile.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
