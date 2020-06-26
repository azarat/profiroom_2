export interface PaymentKonkordInterface {
  operation: string;
  merchant_id: number | any;
  amount: number;
  signature: string;
  order_id: number;
  currency_iso: string;
  description: any;
  add_params: any [];
  approve_url: string;
  decline_url: string;
  cancel_url: string;
  callback_url: string;

}
