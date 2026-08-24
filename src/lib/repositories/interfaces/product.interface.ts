import type { Tables } from '../../../../types/supabase'; // use the SAME correct path you fixed for store.interface.ts

type Product = Tables<'products'>;

export interface IProductRepository {
  // Creates a new product. tracking_type is set here and becomes
  // immutable once any product_units rows exist for it.
  create(storeId: string, data: ProductInput): Promise<Product>;

  // Fetches a single product by its internal id
  getById(productId: string): Promise<Product | null>;

  // Fetches a single product by SKU (used for barcode scan lookups)
  getBySku(storeId: string, sku: string): Promise<Product | null>;

  // Lists products for a store. Defaults to active-only unless
  // includeInactive is explicitly passed.
  list(storeId: string, options?: { includeInactive?: boolean }): Promise<Product[]>;

  // Free-text search by name/SKU, active products only
  search(storeId: string, query: string): Promise<Product[]>;

  // Updates mutable fields — NOT tracking_type or sku (see notes below)
  update(productId: string, data: Partial<ProductUpdateInput>): Promise<Product>;

  // Soft-deletes: sets is_active = false. SKU is retired, never reused.
  softDelete(productId: string): Promise<void>;
}

type ProductInput = {
  name: string;
  sku: string;
  costPrice: number;
  sellingPrice: number;
  reorderThreshold: number;
  trackingType: 'none' | 'imei' | 'serial_number';
};

type ProductUpdateInput = Omit<ProductInput, 'sku' | 'trackingType'>;