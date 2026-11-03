"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { business } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "peer w-full border-0 border-b border-line bg-transparent pt-6 pb-2.5 text-ink placeholder:text-transparent focus:border-cobalt focus:outline-none";
const LABEL =
  "pointer-events-none absolute left-0 top-6 origin-left text-sm text-ink-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-[0.6875rem] peer-focus:tracking-[0.18em] peer-focus:uppercase peer-focus:text-cobalt peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[0.6875rem] peer-[&:not(:placeholder-shown)]:tracking-[0.18em] peer-[&:not(:placeholder-shown)]:uppercase";

/**
 * @param deliveryConfigured true when the server has a mail provider wired up.
 *   When false the form composes a message in the visitor's own mail client
 *   instead of pretending to send one.
 */
export default function ContactForm({ deliveryConfigured }: { deliveryConfigured: boolean }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });

  const set = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((previous) => ({ ...previous, [key]: event.target.value }));
  };

  const mailtoHref = () => {
    const body = [
      `Nombre: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Teléfono: ${values.phone}` : "",
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${business.email}?subject=${encodeURIComponent(
      `Consulta desde la web${values.name ? ` — ${values.name}` : ""}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const validateLocally = () => {
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Indíquenos su nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = "Revise su email.";
    if (values.message.trim().length < 10) next.message = "Cuéntenos un poco más.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateLocally()) return;

    // No provider configured: hand the message to the visitor's mail client.
    if (!deliveryConfigured) {
      window.location.href = mailtoHref();
      return;
    }

    setStatus("sending");
    setServerMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: formData.get("company") ?? "" }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("sent");
        setValues({ name: "", email: "", phone: "", message: "" });
        return;
      }

      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      setStatus("error");
      setServerMessage(
        typeof data.message === "string"
          ? data.message
          : "No hemos podido enviar el mensaje. Pruebe de nuevo o escríbanos directamente.",
      );
    } catch {
      setStatus("error");
      setServerMessage("No hemos podido enviar el mensaje. Compruebe su conexión.");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        className="rounded-2xl border border-cobalt/25 bg-paper p-8 sm:p-10"
      >
        <span aria-hidden="true" className="flex -space-x-1.5">
          {["#1b3fd8", "#ff5a3c", "#6d2fd4", "#ffc219"].map((hex) => (
            <span key={hex} className="size-4 rounded-full mix-blend-multiply" style={{ backgroundColor: hex }} />
          ))}
        </span>
        <h3 className="mt-6 font-display text-3xl tracking-[-0.03em]">Mensaje enviado.</h3>
        <p className="mt-3 max-w-md text-ink-soft">
          Gracias. Le responderemos lo antes posible. Si necesita algo urgente, puede llamarnos al{" "}
          <a href={`tel:${business.phoneHref}`} className="text-cobalt underline underline-offset-4">
            {business.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
        >
          Escribir otro mensaje
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-company`}>Empresa</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div className="relative">
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            value={values.name}
            onChange={set("name")}
            placeholder="Nombre"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={FIELD}
          />
          <label htmlFor={`${uid}-name`} className={LABEL}>
            Nombre
          </label>
          {errors.name ? (
            <p id={`${uid}-name-error`} className="mt-2 text-xs text-coral-deep">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="relative">
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            value={values.email}
            onChange={set("email")}
            placeholder="Email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            className={FIELD}
          />
          <label htmlFor={`${uid}-email`} className={LABEL}>
            Email
          </label>
          {errors.email ? (
            <p id={`${uid}-email-error`} className="mt-2 text-xs text-coral-deep">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="relative">
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          placeholder="Teléfono (opcional)"
          autoComplete="tel"
          className={FIELD}
        />
        <label htmlFor={`${uid}-phone`} className={LABEL}>
          Teléfono (opcional)
        </label>
      </div>

      <div className="relative">
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          placeholder="Mensaje"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          className={`${FIELD} resize-none`}
        />
        <label htmlFor={`${uid}-message`} className={LABEL}>
          ¿En qué podemos ayudarle?
        </label>
        {errors.message ? (
          <p id={`${uid}-message-error`} className="mt-2 text-xs text-coral-deep">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-opacity disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-y-full bg-cobalt transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:transition-none"
          />
          <span className="relative z-10">
            {status === "sending"
              ? "Enviando…"
              : deliveryConfigured
                ? "Enviar mensaje"
                : "Redactar en mi correo"}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="relative z-10 size-4 transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>

        <p className="max-w-xs text-xs leading-relaxed text-ink-muted">
          {deliveryConfigured
            ? "Le responderemos al email que nos indique."
            : `Se abrirá su programa de correo con el mensaje ya redactado para ${business.email}.`}
        </p>
      </div>

      <AnimatePresence>
        {status === "error" && serverMessage ? (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="rounded-xl border border-coral/40 bg-coral/5 px-4 py-3 text-sm text-coral-deep"
          >
            {serverMessage}{" "}
            <a href={mailtoHref()} className="underline underline-offset-4">
              Escribir por email
            </a>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
