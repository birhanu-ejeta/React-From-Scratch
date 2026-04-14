import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import Profile from "./Profile";
import type { ProfileData } from "./Profile";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  imageUrl: string;
  gender: string;
  lang: string[];
  country: string;
  bio: string;
  terms: boolean;
};

type FieldName = keyof FormData;
type Errors = Partial<Record<FieldName, string>>;
type Touched = Partial<Record<FieldName, boolean>>;

const initialFormData: FormData = {
  firstname: "",
  lastname: "",
  email: "",
  contact: "",
  imageUrl: "",
  gender: "",
  lang: [],
  country: "",
  bio: "",
  terms: false,
};

const subjects = ["english", "hindi", "marathi"];

function validate(data: FormData): Errors {
  const errors: Errors = {};

  if (!data.firstname.trim()) errors.firstname = "First name is required.";
  if (!data.lastname.trim()) errors.lastname = "Last name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.contact.trim()) {
    errors.contact = "Contact number is required.";
  } else if (!/^\d{10,15}$/.test(data.contact)) {
    errors.contact = "Contact must be 10-15 digits.";
  }

  if (!data.imageUrl) {
    errors.imageUrl = "Please upload an image from your computer.";
  }

  if (!data.gender) errors.gender = "Please select a gender.";
  if (!data.country) errors.country = "Please select a country.";
  if (data.lang.length === 0) errors.lang = "Select at least one subject.";
  if (!data.bio.trim()) errors.bio = "Bio is required.";
  if (!data.terms) errors.terms = "You must accept terms.";

  return errors;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedProfile, setSubmittedProfile] = useState<ProfileData | null>(
    null,
  );

  const errors = validate(formData);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as FieldName;

    if (fieldName === "imageUrl" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];

      if (!file) {
        setFormData((prev) => ({ ...prev, imageUrl: "" }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: String(reader.result ?? ""),
        }));
      };
      reader.readAsDataURL(file);
      return;
    }

    if (fieldName === "lang" && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        lang: checked
          ? [...prev.lang, value]
          : prev.lang.filter((item) => item !== value),
      }));
      return;
    }

    if (fieldName === "terms" && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        terms: checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const fieldName = e.target.name as FieldName;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (!hasErrors) {
      setSubmittedProfile({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        contact: formData.contact,
        imageUrl: formData.imageUrl,
        gender: formData.gender,
        lang: formData.lang,
        country: formData.country,
        bio: formData.bio,
      });
      console.log("Submitted data:", formData);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setTouched({});
    setSubmitted(false);
    setSubmittedProfile(null);
  };

  const shouldShowError = (field: FieldName) =>
    Boolean((touched[field] || submitted) && errors[field]);

  const inputBaseClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Professional Profile Form
        </h1>
        <p className="mt-2 mb-6 text-sm text-slate-500">
          Fill in your details below. Fields marked with * are required.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <fieldset className="flex flex-col gap-3 items-start">
            <label htmlFor="firstname" className="text-green-800 font-semibold">
              First Name*
            </label>
            <input
              className={inputBaseClass}
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {shouldShowError("firstname") && (
              <p className="text-red-600 text-sm font-medium">
                {errors.firstname}
              </p>
            )}

            <label htmlFor="lastname" className="font-semibold text-slate-700">
              Last Name*
            </label>
            <input
              className={inputBaseClass}
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {shouldShowError("lastname") && (
              <p className="text-red-600 text-sm font-medium">
                {errors.lastname}
              </p>
            )}

            <label htmlFor="email" className="font-semibold text-slate-700">
              Email*
            </label>
            <input
              className={inputBaseClass}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {shouldShowError("email") && (
              <p className="text-red-600 text-sm font-medium">{errors.email}</p>
            )}

            <label htmlFor="contact" className="font-semibold text-slate-700">
              Contact Number*
            </label>
            <input
              className={inputBaseClass}
              type="tel"
              name="contact"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="10-15 digits"
            />
            {shouldShowError("contact") && (
              <p className="text-red-600 text-sm font-medium">
                {errors.contact}
              </p>
            )}

            <label htmlFor="imageUrl" className="font-semibold text-slate-700">
              Profile Image*
            </label>
            <input
              className={inputBaseClass}
              type="file"
              name="imageUrl"
              id="imageUrl"
              accept="image/*"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Selected profile preview"
                className="h-24 w-24 rounded-xl object-cover border border-slate-300 shadow"
              />
            )}
            {shouldShowError("imageUrl") && (
              <p className="text-red-600 text-sm font-medium">
                {errors.imageUrl}
              </p>
            )}

            <label htmlFor="gender" className="font-semibold text-slate-700">
              Gender*
            </label>
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <label htmlFor="male" className="flex items-center gap-2">
                <input
                  className="h-4 w-4 accent-emerald-600"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Male
              </label>
              <label htmlFor="female" className="flex items-center gap-2">
                <input
                  className="h-4 w-4 accent-emerald-600"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Female
              </label>
              <label htmlFor="other" className="flex items-center gap-2">
                <input
                  className="h-4 w-4 accent-emerald-600"
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Other
              </label>
            </div>
            {shouldShowError("gender") && (
              <p className="text-red-600 text-sm font-medium">
                {errors.gender}
              </p>
            )}

            <label htmlFor="lang" className="font-semibold text-slate-700">
              Your Best Subjects*
            </label>
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              {subjects.map((subject) => (
                <label
                  key={subject}
                  htmlFor={subject}
                  className="flex items-center gap-2"
                >
                  <input
                    className="h-4 w-4 accent-emerald-600"
                    type="checkbox"
                    name="lang"
                    id={subject}
                    value={subject}
                    checked={formData.lang.includes(subject)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {subject[0].toUpperCase() + subject.slice(1)}
                </label>
              ))}
            </div>
            {shouldShowError("lang") && (
              <p className="text-red-600 text-sm font-medium">{errors.lang}</p>
            )}

            <label htmlFor="country" className="font-semibold text-slate-700">
              Country*
            </label>
            <select
              className={inputBaseClass}
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select country</option>
              <option value="ethiopia">Ethiopia</option>
              <option value="kenya">Kenya</option>
              <option value="nigeria">Nigeria</option>
            </select>
            {shouldShowError("country") && (
              <p className="text-red-600 text-sm font-medium">
                {errors.country}
              </p>
            )}

            <label htmlFor="bio" className="font-semibold text-slate-700">
              Bio*
            </label>
            <textarea
              className={inputBaseClass}
              name="bio"
              id="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us about yourself"
            />
            {shouldShowError("bio") && (
              <p className="text-red-600 text-sm font-medium">{errors.bio}</p>
            )}

            <label
              htmlFor="terms"
              className="flex items-center gap-2 mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700"
            >
              <input
                className="h-4 w-4 accent-emerald-600"
                type="checkbox"
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              I accept the terms and conditions*
            </label>
            {shouldShowError("terms") && (
              <p className="text-red-600 text-sm font-medium">{errors.terms}</p>
            )}

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={hasErrors && submitted}
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>

        {submittedProfile && <Profile profile={submittedProfile} />}
      </div>
    </div>
  );
}
