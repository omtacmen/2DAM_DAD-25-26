export function isValidSexo(sexo) {
  return sexo === "M" || sexo === "F";
}

export function isValidEmail(email) {
  if (typeof email !== "string") return false;
  // Simple y suficiente para clase
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function toBool01(value) {
  // Acepta true/false, 1/0, "1"/"0", "true"/"false"
  if (value === true || value === 1 || value === "1" || value === "true") return 1;
  return 0;
}

