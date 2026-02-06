Campus Companion Prototype
A full‑stack web prototype (Motoko + React) that demonstrates an integrated student‑centric campus platform, featuring four foundational modules and a mock login flow for demo purposes.

Tech Stack
Backend: Motoko (single canister)
Frontend: React + TypeScript + Vite
Styling: Tailwind CSS
State/Data: React Query
Deployment: Internet Computer
Auth: Mock login for demo
Features
1. Mock Login
Users enter any display name to start a demo session.
UI clearly indicates Demo / Mock Mode.
2. Integrated App Shell
Global navigation across all core modules:
Daily Pulse
Student Exchange
Explorer’s Guide
Academic Cockpit
3. Daily Pulse
Live Mess Menu with daily menus + browse by date.
Email Summarizer using lightweight, local heuristic text processing.
4. Student Exchange
Lost & Found: Create + list + detail pages.
Marketplace: Buy/Sell listings with title, price, category, description.
Travel Sharing: Cab‑pool trip listings + create/join/leave functionality.
5. Explorer’s Guide
Directory of campus places (eateries, spots, attractions).
Ratings + reviews + detailed place view.
6. Academic Cockpit
Personal timetable management.
Add / edit / delete class sessions with course, time, location.
Displayed in a schedule layout.
7. Unified Theme
Consistent creative visual theme.
Custom color palette (non‑blue/purple primary colors).
Static branding assets included in the frontend.
Backend Persistence
All module data is stored in the Motoko main actor and scoped by mock user identity:

Mess menus
Summarized mail history
Lost & Found
Marketplace items
Travel trips & participants
Places & reviews
Timetables
Known Issues
Some users may experience a blank white screen after mock login (frontend render failure).
How to Run Locally
Install dependencies: pnpm install
Start frontend: pnpm dev
Start backend canister with DFX: dfx start and dfx deploy
License
Prototype — educational/demo use.
