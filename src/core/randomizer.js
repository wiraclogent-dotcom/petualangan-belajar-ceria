/**
 * Mesin Pengacak Anti-Pola (Fisher-Yates Shuffle Engine)
 * Memastikan urutan soal, opsi jawaban, dan kursor remote selalu teracak dinamis
 * agar anak belajar konsep murni, bukan menghafal posisi tombol.
 */
export function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
