import Button from "../../../../@ui/Button";
import Typography from "../../../../@ui/typography";
import { TCategory, TProduct } from "../api/type";

type CategoryProps = {
  item: TCategory;
  setProduct: (_product: TProduct[]) => void;
};
export default function Category({ item, setProduct }: CategoryProps) {
  return (
    <div className="p-2">
      <Button
        onClick={() => setProduct(item.products)}
        className="bg-blue-500 text-white rounded-lg px-10 p-3 w-full"
      >
        <Typography text={item.name} customClass="text-center" />
      </Button>
      <button></button>
    </div>
  );
}
