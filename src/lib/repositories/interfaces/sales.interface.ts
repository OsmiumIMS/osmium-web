import type { Tables } from '../../../../types/supabase';

type Sale = Tables<'sales'>;

export interface ISalesRepository {
  // Records a sale AND its corresponding stock_movements row (type: 'sale')
  // as one atomic operation — never called separately from stock adjustment
  create(storeId: string, data: SaleInput): Promise<Sale>;

  getTodayAnalytics(storeId: string): Promise<SalesAnalytics>;
}

type SaleInput = {
  productId: string;
  sellingPriceAtSale: number;
  costPriceAtSale: number;
  imeiSerial?: string;
  transactionId?: string;
};

type SalesAnalytics = {
  totalRevenue: number;
  totalProfit: number;
  unitsSold: number;
};