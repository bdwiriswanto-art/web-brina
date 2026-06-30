import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

function getGoogleAuth() {
  const oauth2Client = new google.auth.OAuth2(
    process.env['GOOGLE_OAUTH_CLIENT_ID'],
    process.env['GOOGLE_OAUTH_CLIENT_SECRET']
  );

  oauth2Client.setCredentials({
    refresh_token: process.env['GOOGLE_OAUTH_REFRESH_TOKEN']
  });

  return oauth2Client;
}

app.post('/api/sync-sheets', async (req, res) => {
  try {
    const auth = getGoogleAuth();
    const drive = google.drive({ version: 'v3', auth });
    const sheets = google.sheets({ version: 'v4', auth });
    const { data } = req.body;

    const sheetName = "Laporan Penjualan BRINA PUTIH TELUR";
    
    const response = await drive.files.list({
      q: `name='${sheetName}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
      fields: 'files(id, name, webViewLink)',
      spaces: 'drive',
    });

    let spreadsheetId = '';
    let spreadsheetUrl = '';

    if (response.data.files && response.data.files.length > 0) {
      spreadsheetId = response.data.files[0].id!;
      spreadsheetUrl = response.data.files[0].webViewLink!;
    } else {
      const newSheet = await sheets.spreadsheets.create({
        requestBody: {
          properties: { title: sheetName },
          sheets: [{ properties: { title: "Data Transaksi" } }]
        },
      });
      spreadsheetId = newSheet.data.spreadsheetId!;
      spreadsheetUrl = newSheet.data.spreadsheetUrl!;

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Data Transaksi!A1:G1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['Tanggal', 'Tipe Transaksi', 'Nama Barang', 'Qty (KG)', 'Harga', 'Total', 'Keterangan']],
        },
      });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Data Transaksi!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            data.date, 
            data.type === 'penjualan' ? 'Penjualan (Keluar)' : 'Pembelian (Masuk)',
            data.item,
            data.qty,
            data.price,
            data.total,
            data.note || ''
          ]
        ],
      },
    });

    res.json({ success: true, spreadsheetUrl });
  } catch (error: any) {
    console.error('Error syncing to sheets:', error);
    res.status(500).json({ error: error.message });
  }
});

export default app;
