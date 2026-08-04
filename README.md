
# LOLSTATS

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Riot API](https://img.shields.io/badge/Riot%20Games%20API-D32936?style=for-the-badge&logo=riotgames&logoColor=white)

Web/App desarrollada con **Next.js** para la consulta de estadísticas de jugadores de **League of Legends**, visualización de su historial, partidas, comprobar si el jugador esta jugando en ese momento y poder consultar las estadísticas de los jugadores en dicha partida en vivo. Todo usando la API oficial de Riot Games.

---

# Capturas

### Página principal

![Página principal](github_screenshots/landpage.png)

---

### Perfil de invocador

![Perfil Invocador](github_screenshots/perfil_invocador.png)

---

### Partida en vivo

![Partida en vivo](github_screenshots/partida_live.png)

---

# Características

- Búsqueda de jugadores mediante Riot ID.
- Historial de partidas recientes.
- Estadísticas de SoloQ y Flex.
- Información detallada de cada partida.
- Detección de partidas en directo.
- Visualización de ambos equipos en una partida activa.
- Información de rango, LP, nivel y winrate.
- Interfaz responsive.
- Preparado para despliegue mediante Docker.

---

# Estructura del proyecto (para desplegarlo)

```text
.
release/
├── .env.example
├── docker-compose.yml
├── Dockerfile
└── nginx.conf
```

El directorio `release/` contiene todo lo necesario para lanzar la web/app mediante Docker.

---

# Configuración

Entrar en el directorio release:

```bash
cd release
```

Editamos el fichero `.env` para meter tu clave de la API de Riot:

```env
RIOT_API_KEY=TU_API_KEY
```

---

# Despliegue

Desde el directorio `release`:

```bash
docker compose up --build -d
```

Una vez finalice la compilación, la aplicación estará disponible en:

```text
http://localhost
```

Nginx actúa como proxy inverso hacia la aplicación Next.js.

---

## Autor

[![GitHub](https://img.shields.io/badge/GitHub-pabhb2--bnnuy-181717?style=for-the-badge&logo=github)](https://github.com/pabhb2-bnnuy)
