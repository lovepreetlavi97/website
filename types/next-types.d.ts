import 'next';
import type { NextPage } from 'next';

// Fix for Next.js build error with PageProps
declare module 'next' {
  // Override the PageProps type to fix the param issue
  export interface PageProps {
    params?: any;
    searchParams?: any;
  }
  
  // Add compatibility for pages with custom props
  export type NextPageWithProps<P = {}, IP = P> = NextPage<P, IP>;
} 