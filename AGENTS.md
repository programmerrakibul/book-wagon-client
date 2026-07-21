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
│   ├── ui/                  # Shadcn + shared primitives (Button, Card, Field, FormField, etc.)
│   ├── shared/              # Reusable composed components
│   │   ├── data-table.jsx   # Responsive table with mobile card view
│   │   ├── pagination.jsx   # Page-number pagination with ellipsis
│   │   ├── skeleton-layout.jsx  # Table/card/details skeleton variants
│   │   ├── empty-state.jsx  # Empty state with icon, title, description, action
│   │   ├── confirm-dialog.jsx   # Reusable AlertDialog confirmation
│   │   └── form-section.jsx # Card-wrapped form field group with title
│   └── skeletons/           # Domain-specific skeleton loaders
│       ├── book-card-skeleton.jsx
│       └── book-details-skeleton.jsx
├── config/                  # constants.js (APP_NAME, TOKEN_STORAGE_KEY)
├── features/
│   ├── auth/                # Login, Register, useAuthStore
│   │   ├── components/      # login-form.schema.js
│   │   ├── hooks/           # use-role.js
│   │   ├── pages/           # login-page.jsx, register-page.jsx
│   │   └── services/        # auth.service.js (postUser, getUserRole)
│   ├── book/                # CRUD, filters, details
│   │   ├── components/      # book-card, book-form, book-filters, modals, etc.
│   │   ├── constants/       # defaultValues, sortOptions
│   │   ├── hooks/           # use-books.js, use-categories.js, use-favorites.js, use-comments.js
│   │   ├── pages/           # book-list, book-details, add-book, my-books, manage-books
│   │   ├── services/        # books.service.js, categories.service.js, favorites.service.js, comments.service.js
│   │   └── validation/      # Zod schemas (book.js)
│   ├── dashboard/           # Admin/Librarian/User dashboards
│   │   ├── components/      # metric-card, admin/librarian/user-overview
│   │   ├── hooks/           # use-dashboard.js (useAdminDashboard, useLibrarianDashboard, useUserDashboard)
│   │   ├── pages/           # overview-page.jsx
│   │   └── services/        # dashboard.service.js (fetchAdminDashboard, fetchLibrarianDashboard, fetchUserDashboard)
│   ├── order/               # Order management
│   │   ├── hooks/           # use-orders.js (useOrders, useCreateOrder, useUpdateOrderStatus, useDeleteOrder, useCheckout, useOrdered, useInvoices)
│   │   ├── pages/           # my-orders, all-orders, invoices
│   │   ├── services/        # orders.service.js
│   │   └── validation/      # Zod schemas (order.js)
│   ├── profile/             # Profile management
│   │   ├── hooks/           # use-users.js (useUsers, useUpdateUserRole)
│   │   ├── pages/           # profile, edit-profile, manage-users
│   │   └── services/        # profile.service.js, users.service.js
│   ├── shared/              # Cross-feature shared constants
│   │   └── constants/       # statuses.js (UserRoles, UserRoleConfig, BookStatuses, OrderStatuses, PaymentStatuses, getStatusBadge)
│   ├── site/                # Public-facing pages
│   │   ├── components/      # banner, authors, FAQ, etc.
│   │   ├── data/            # slider-data, available-cities
│   │   └── pages/           # home, about, contact, not-found
│   └── wishlist/            # Wishlist page
│       ├── hooks/           # use-wishlist.js (useWishlist)
│       ├── pages/           # wishlist-page.jsx
│       └── services/        # wishlist.service.js
├── hooks/                   # Shared hooks (use-mobile.js)
├── layouts/                 # Root, Dashboard, Auth, Profile layouts
├── lib/                     # axios.js, upload-image.js
├── routes/                  # router.jsx, private-route, admin-route, librarian-route
├── store/                   # Zustand stores (auth, book-filters, theme, ui)
└── utils/                   # utils.js (cn helper), error.js (getAxiosError, getAuthErrorMessage)
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

### Shared Components

Always use these composed components instead of building from scratch:

| Component | Import | Purpose |
|-----------|--------|---------|
| `DataTable` | `@/components/shared/data-table` | Responsive table with mobile card view, sorting |
| `Pagination` | `@/components/shared/pagination` | Page-number pagination with ellipsis |
| `SkeletonLayout` | `@/components/shared/skeleton-layout` | Variants: `cards`, `table`, `details` |
| `EmptyState` | `@/components/shared/empty-state` | Icon, title, description, action button |
| `ConfirmDialog` | `@/components/shared/confirm-dialog` | AlertDialog with onConfirm callback |
| `FormSection` | `@/components/shared/form-section` | Card-wrapped grouped form fields |

### Shared Status/Role Constants

**Never** define inline badge color objects. Use shared constants from
`@/features/shared/constants/statuses`:

```jsx
import {
  UserRoleConfig,
  OrderStatusConfig,
  PaymentStatusConfig,
  getStatusBadge,
} from "@/features/shared/constants/statuses";
import { Badge } from "@/components/ui/badge";

// Usage
const s = getStatusBadge(order.status, OrderStatusConfig);
return <Badge variant="outline" className={s.className}>{s.label}</Badge>;
```

Available configs: `UserRoleConfig`, `BookStatusConfig`, `OrderStatusConfig`,
`PaymentStatusConfig`.

Available enums: `UserRoles`, `BookStatuses`, `OrderStatuses`, `PaymentStatuses`.

### Forms (every form must follow this pattern)

**Preferred: FormField hashmap for forms with many fields.**

Define fields as a hashmap array, then render via `<FormField>`:

```jsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
});

const fields = [
  { name: "name", label: "Name", type: "input", placeholder: "Enter name" },
  {
    name: "role",
    label: "Role",
    type: "select",
    placeholder: "Select role",
    options: [
      { value: "user", label: "User" },
      { value: "admin", label: "Admin" },
    ],
  },
];

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", role: "" },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {fields.map((f) => (
        <FormField
          key={f.name}
          field={f}
          control={form.control}
          disabled={form.formState.isSubmitting}
        />
      ))}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
```

For grouped forms, use `FormSection`:

```jsx
import { FormSection } from "@/components/shared/form-section";

const sections = [
  {
    title: "Basic Information",
    columns: 2,
    fields: [/* field objects */],
  },
];

// Render
{sections.map((section) => (
  <FormSection
    key={section.title}
    title={section.title}
    fields={section.fields}
    control={control}
    disabled={disabled}
    columns={section.columns}
  />
))}
```

Supported field types: `input`, `textarea`, `select`, `file`. Each field gets
`data-invalid` and `aria-invalid` when there's an error. Fields are disabled
when `disabled` is true (during submission).

**For simple forms**, manual Controller pattern:

```jsx
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

<Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={!!fieldState.error || undefined}>
      <FieldLabel>Email</FieldLabel>
      <FieldContent>
        <Input
          {...field}
          aria-invalid={!!fieldState.error || undefined}
          data-invalid={!!fieldState.error || undefined}
          disabled={form.formState.isSubmitting}
        />
        <FieldError>{fieldState.error?.message}</FieldError>
      </FieldContent>
    </Field>
  )}
/>;
```

### Data Fetching (TanStack Query)

**Architecture: Service → Hook → Page.**

Services handle HTTP. Hooks wrap queries/mutations with cache keys and toasts.
Pages consume hooks only.

**Service pattern** (`features/<name>/services/<name>.service.js`):

```jsx
import axiosInstance from "@/lib/axios";

export async function fetchItems(params) {
  const { data } = await axiosInstance.get("/items", { params });
  return data ?? {};
}

export async function createItem(payload) {
  const { data } = await axiosInstance.post("/items", payload);
  return data || {};
}
```

**Hook pattern** (`features/<name>/hooks/use-<name>.js`):

```jsx
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAxiosError } from "@/utils/error";
import { fetchItems, createItem } from "../services/<name>.service";

// Organized query keys
export const itemKeys = {
  all: ["items"],
  list: (params) => ["items", "list", params],
  detail: (id) => ["items", "detail", id],
};

// Paginated query with placeholderData
export function useItems(params) {
  return useQuery({
    queryKey: itemKeys.list(params),
    queryFn: () => fetchItems(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

// Mutation with toast + invalidation
export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Created!");
        queryClient.invalidateQueries({ queryKey: itemKeys.all });
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      const msg = getAxiosError(error);
      toast.error(msg || "Failed to create.");
    },
  });
}
```

**All mutations must live in `hooks/use-*.js`**, not in page components. Pages
consume hooks: `const createMutation = useCreateItem()`.

**Page pattern** — use `DataTable`, `Pagination`, `SkeletonLayout`, `EmptyState`:

```jsx
import { useSearchParams } from "react-router";
import { useItems } from "../hooks/use-items";
import { DataTable } from "@/components/shared/data-table";
import { Pagination } from "@/components/shared/pagination";
import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import { EmptyState } from "@/components/shared/empty-state";

function ItemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useItems({ page, limit: 10 });
  const items = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handlePageChange = useCallback(
    (p) => setSearchParams({ page: String(p) }),
    [setSearchParams],
  );

  if (isLoading) return <SkeletonLayout variant="table" count={10} />;
  if (!items.length) return <EmptyState title="No items found" />;

  return (
    <>
      <DataTable columns={columns} data={items} renderCard={renderCard} />
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}
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
- Confirmation dialogs: Use `ConfirmDialog` from `@/components/shared/confirm-dialog`
- **Never** use SweetAlert2

### Routing

- All routes defined in `src/routes/router.jsx`
- Protected routes: `PrivateRoute`, `AdminRoute`, `LibrarianRoute`
- Page titles set via `<title>` element at top of page component

### Responsive Design

- Mobile-first: `sm:`, `md:`, `lg:` breakpoints
- Responsive grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Sidebar: Sheet on mobile, persistent on desktop
- Tables: Use `DataTable` which renders cards on mobile (`renderCard` prop) and table on desktop
- Always provide `renderCard` to `DataTable` for mobile responsiveness

### File Naming

- Components: `component-name.jsx` (kebab-case)
- Pages: `page-name.jsx`
- Services: `resource.service.js`
- Hooks: `use-resource.js`
- Stores: `use-resource-store.js`
- Constants: `index.js` or descriptive name (e.g., `statuses.js`)

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
