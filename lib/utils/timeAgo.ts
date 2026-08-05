export function timeAgo(timestamp: number) {
  const now = Date.now();

  const diff = now - timestamp;

  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `Hace ${minutes} minutos`;
  }

  if (hours < 24) {
    return `Hace ${hours} horas`;
  }

  return `Hace ${days} días`;
}