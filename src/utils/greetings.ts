export function greetings(): string {
  const now = new Date().getHours();
  if (now >= 5 && now < 12) {
    return "Bom dia";
  } else if (now >= 12 && now < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}
