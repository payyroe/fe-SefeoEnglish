import { Redirect } from 'expo-router';

export default function Index() {
  // Nanti kalau sudah ada logic cek "sudah login atau belum",
  // redirect-nya bisa dibuat kondisional (ke '/home' kalau sudah login).
  return <Redirect href="/login" />;
}