# Book Wagon — Engineering Guide

## Tech Stack

| Layer          | Technology                                |
| -------------- | ----------------------------------------- |
| Framework      | React 19 + Vite 7                         |
| Styling        | Tailwind CSS v4                           |
| UI Library     | Shadcn (new-york style) + Radix + Base UI |
| State (server) | TanStack Query v5                         |
| State (client) | Zustand v5 + Immer                        |
| Forms          | React Hook Form v7 + Zod v4               |
| Icons          | lucide-react (EXCLUSIVE — no react-icons) |
| Animations     | Framer Motion + GSAP + ScrollTrigger      |
| Routing        | React Router v7                           |
| HTTP           | Axios (via `@/lib/axios.js`)              |
| Auth           | Firebase Auth + JWT                       |

## Directory Structure

```
src/
├── assets/                  # Static images (PNG, JPG, AVIF)
├── components/
│   └── ui/                  # Shadcn + shared primitives (Button, Card, Field, etc.)
├── config/                  # constants.js (API_BASE_URL)
├── features/
│   ├── auth/                # Login, Register, useAuthStore
│   │   ├── components/      # (future: auth-specific UI)
│   │   ├── hooks/           # use-role.js
│   │   ├── pages/           # login-page.jsx, register-page.jsx
│   │   └── services/        # auth.service.js
│   ├── books/               # CRUD, filters, details
│   │   ├── hooks/           # use-books.js, use-categories.js
│   │   ├── pages/           # 6 page components
│   │   └── services/        # books.service.js, categories.service.js
│   ├── dashboard/           # Admin/Librarian/User dashboards
│   │   ├── components/      # metric-card, admin/librarian/user-overview
│   │   └── pages/           # overview-page.jsx
│   ├── orders/              # Order management
│   │   ├── pages/           # my-orders, all-orders, invoices
│   │   └── services/        # orders.service.js
│   ├── profile/             # Profile management
│   │   └── pages/           # profile, edit-profile, manage-users
│   ├── site/                # Public-facing pages
│   │   ├── components/      # banner, authors, FAQ, etc.
│   │   ├── data/            # slider-data, available-cities
│   │   └── pages/           # home, about, contact, not-found
│   └── wishlist/            # Wishlist page
│       └── pages/           # wishlist-page.jsx
├── hooks/                   # Shared hooks (use-mobile.js)
├── layouts/                 # Root, Dashboard, Auth, Profile layouts
├── lib/                     # axios.js, upload-image.js
├── routes/                  # router.jsx, private-route, admin-route, librarian-route
├── store/                   # Zustand stores (auth, book-filters, theme)
└── utils/                   # utils.js (cn helper)
```

## Conventions

### Imports

- **Always** use `@/` alias: `import { Button } from "@/components/ui/button"`
- **Never** use relative paths for cross-feature imports
- Named exports only: `export { ComponentName }` /
  `import { ComponentName } from "..."`

### UI Components

- Use Shadcn components from `@/components/ui/` exclusively
- Add new primitives via CLI: `npx shadcn@latest add <component>`
- Style with `cn()` from `@/utils/utils.js`
- Icons: `lucide-react` ONLY

### Forms (every form must follow this pattern)

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (data) => {
    toast.success("Submitted!");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field invalid={!!fieldState.error}>
            <FieldLabel>Name</FieldLabel>
            <Input {...field} />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
```

### Data Fetching (TanStack Query)

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Queries
const { data, isLoading, error } = useQuery({
  queryKey: ["books", filters],
  queryFn: () => fetchBooks(filters),
});

// Mutations
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: createBook,
  onSuccess: () => {
    toast.success("Created!");
    queryClient.invalidateQueries({ queryKey: ["books"] });
  },
  onError: (err) => toast.error(err.message),
});
```

### Client State (Zustand + Immer)

```jsx
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useStore = create(
  immer((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => {
        state.items.push(item);
      }),
    removeItem: (id) =>
      set((state) => {
        state.items = state.items.filter((i) => i.id !== id);
      }),
  })),
);
```

### Notifications

- Success: `toast.success("Message")` from `sonner`
- Confirmation dialogs: Shadcn `AlertDialog`
- **Never** use SweetAlert2

### Routing

- All routes defined in `src/routes/router.jsx`
- Protected routes: `PrivateRoute`, `AdminRoute`, `LibrarianRoute`
- Page titles set via `useEffect(() => { document.title = "..." }, [])`

### Responsive Design

- Mobile-first: `sm:`, `md:`, `lg:` breakpoints
- Responsive grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Sidebar: Sheet on mobile, persistent on desktop
- Navigation: Mobile hamburger menu, desktop horizontal nav

### File Naming

- Components: `component-name.jsx` (kebab-case)
- Pages: `page-name.jsx`
- Services: `resource.service.js`
- Hooks: `use-resource.js`
- Stores: `use-resource-store.js`

### Layouts

- `RootLayout` — public site (Navbar + Footer)
- `DashboardLayout` — admin/librarian/user dashboard (Sidebar + TopBar)
- `AuthLayout` — login/register (split view with image)
- `ProfileLayout` — profile pages (Tabs navigation)

## Running

```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint
npm run preview    # Preview production build
```
