export interface DailySale {
  id?: string;
  tgl: string;
  order: {
    nama: string;
    qty: number;
    harga: number;
    total: number;
  };
  jual: {
    nama: string;
    qty: number;
    harga: number;
    total: number;
  };
  stok: number;
  subtotal: number;
  keterangan: string;
  createdAt: number;
}
