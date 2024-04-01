"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/campaigns`,
      label: 'Campaigns',
      active: pathname === `/${params.storeId}/campaigns`,
    },
    {
      href: `/${params.storeId}/blogs`,
      label: 'Blogs',
      active: pathname === `/${params.storeId}/blogs`,
    },
    {
      href: `/${params.storeId}/gallery`,
      label: 'Gallery',
      active: pathname === `/${params.storeId}/gallery`,
      
    },

    {
      href: `/${params.storeId}/aboutUs`,
      label: 'AboutUs',
      active: pathname === `/${params.storeId}/aboutUs`,
    },
    {
      href: `/${params.storeId}/trustee`,
      label: 'Trustee',
      active: pathname === `/${params.storeId}/trustee`,
    },
    {
      href: `/${params.storeId}/users`,
      label: 'Users',
      active: pathname === `/${params.storeId}/users`,
    },
    {
      href: `/${params.storeId}/donations`,
      label: 'Donations',
      active: pathname === `/${params.storeId}/donations`,
    },

    // {
    //   href: `/${params.storeId}/sizes`,
    //   label: 'Sizes',
    //   active: pathname === `/${params.storeId}/sizes`,
    // },
    // {
    //   href: `/${params.storeId}/colors`,
    //   label: 'Colors',
    //   active: pathname === `/${params.storeId}/colors`,
    // },
    // {
    //   href: `/${params.storeId}/products`,
    //   label: 'Products',
    //   active: pathname === `/${params.storeId}/products`,
    // },
    // {
    //   href: `/${params.storeId}/orders`,
    //   label: 'Orders',
    //   active: pathname === `/${params.storeId}/orders`,
    // },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
