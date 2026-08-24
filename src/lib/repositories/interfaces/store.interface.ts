import type { Tables } from '../../../../types/supabase'; // adjust path per repo

type Store = Tables<'stores'>;

export interface IStoreRepository {
  // Creates the store row — only called once, during Store Setup
  create(userId: string, data: StoreInput): Promise<Store>;

  // Fetches the store for a given user — used at cold-start routing
  getByUserId(userId: string): Promise<Store | null>;

  // Updates store settings — slug is locked at creation, not editable here
  update(storeId: string, data: Partial<StoreUpdateInput>): Promise<Store>;
}

type StoreInput = {
  name: string;
  slug: string;
  currency: string;
  timezone: string;
};

type StoreUpdateInput = Omit<StoreInput, 'slug'>;