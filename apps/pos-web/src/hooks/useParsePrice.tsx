export default function useParsePrice() {
  const parsePrice = (price: number) => `${price}rs`;
  return { parsePrice };
}
