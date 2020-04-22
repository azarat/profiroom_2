export interface FinanceInterface {
  purse?: {
    user_id?: number;
    withdraw: number;
    hold?: number;
    deposited?: number;
    summ?: number;
    created_at?: number;
    deals_done_count?: number;
    arbitration_count?: number;
    deals_count?: number;
    withdrawn?: number;
    dealers_count: number;
  };
  history?:
    {
      id: number;
      amount: number;
      purse_id: number;
      dealer_id: number;
      offers_id: number;
      income: number;
      created_at: string;
      OffersTitle?: string;
      user: {
        avatar: string;
        name: string;
        surname: string;
      }
    }[];

}
