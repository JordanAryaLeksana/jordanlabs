/** Fungsi ini digunakan untuk menggabungkan beberapa className, membuang nilai falsy. */
export function cn(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(" ");
}
