import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, useNavigate } from '@tanstack/react-router';
import { MockSessionProvider, useMockSession } from './hooks/useMockSession';
import MockLoginPage from './pages/MockLoginPage';
import DashboardPage from './pages/DashboardPage';
import DailyPulsePage from './pages/daily-pulse/DailyPulsePage';
import StudentExchangePage from './pages/student-exchange/StudentExchangePage';
import LostFoundListPage from './pages/student-exchange/lost-found/LostFoundListPage';
import LostFoundDetailPage from './pages/student-exchange/lost-found/LostFoundDetailPage';
import MarketplaceListPage from './pages/student-exchange/marketplace/MarketplaceListPage';
import MarketplaceDetailPage from './pages/student-exchange/marketplace/MarketplaceDetailPage';
import TravelTripsPage from './pages/student-exchange/travel/TravelTripsPage';
import PlacesListPage from './pages/explorers-guide/PlacesListPage';
import PlaceDetailPage from './pages/explorers-guide/PlaceDetailPage';
import AcademicCockpitPage from './pages/academic-cockpit/AcademicCockpitPage';
import AppShell from './components/AppShell';
import { useEffect, ReactNode } from 'react';

// Layout component that includes AppShell for authenticated routes
function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useMockSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: '/login' });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <AppShell>
      {children}
    </AppShell>
  );
}

// Root route with redirect logic
function RootComponent() {
  const { isLoggedIn } = useMockSession();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if logged in, otherwise to login
    if (isLoggedIn) {
      navigate({ to: '/dashboard' });
    } else {
      navigate({ to: '/login' });
    }
  }, [isLoggedIn, navigate]);

  return null;
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Index route (redirects to appropriate page)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: RootComponent,
});

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: MockLoginPage,
});

// Dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <AuthenticatedLayout>
      <DashboardPage />
    </AuthenticatedLayout>
  ),
});

// Daily Pulse
const dailyPulseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/daily-pulse',
  component: () => (
    <AuthenticatedLayout>
      <DailyPulsePage />
    </AuthenticatedLayout>
  ),
});

// Student Exchange
const studentExchangeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-exchange',
  component: () => (
    <AuthenticatedLayout>
      <StudentExchangePage />
    </AuthenticatedLayout>
  ),
});

const lostFoundListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-exchange/lost-found',
  component: () => (
    <AuthenticatedLayout>
      <LostFoundListPage />
    </AuthenticatedLayout>
  ),
});

const lostFoundDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-exchange/lost-found/$postId',
  component: () => (
    <AuthenticatedLayout>
      <LostFoundDetailPage />
    </AuthenticatedLayout>
  ),
});

const marketplaceListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-exchange/marketplace',
  component: () => (
    <AuthenticatedLayout>
      <MarketplaceListPage />
    </AuthenticatedLayout>
  ),
});

const marketplaceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-exchange/marketplace/$listingId',
  component: () => (
    <AuthenticatedLayout>
      <MarketplaceDetailPage />
    </AuthenticatedLayout>
  ),
});

const travelTripsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-exchange/travel',
  component: () => (
    <AuthenticatedLayout>
      <TravelTripsPage />
    </AuthenticatedLayout>
  ),
});

// Explorer's Guide
const placesListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/explorers-guide',
  component: () => (
    <AuthenticatedLayout>
      <PlacesListPage />
    </AuthenticatedLayout>
  ),
});

const placeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/explorers-guide/$placeId',
  component: () => (
    <AuthenticatedLayout>
      <PlaceDetailPage />
    </AuthenticatedLayout>
  ),
});

// Academic Cockpit
const academicCockpitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/academic-cockpit',
  component: () => (
    <AuthenticatedLayout>
      <AcademicCockpitPage />
    </AuthenticatedLayout>
  ),
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  dailyPulseRoute,
  studentExchangeRoute,
  lostFoundListRoute,
  lostFoundDetailRoute,
  marketplaceListRoute,
  marketplaceDetailRoute,
  travelTripsRoute,
  placesListRoute,
  placeDetailRoute,
  academicCockpitRoute,
]);

// Create router
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
});

// Type declaration for router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <MockSessionProvider>
      <RouterProvider router={router} />
    </MockSessionProvider>
  );
}
