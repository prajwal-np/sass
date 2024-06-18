import { Input, InputProps } from "@nextui-org/react";
import CSButton from "../../../@ui/CSButton";
import { addProduct } from "../../../redux/menu/product/product.action";
import { Product } from "../../../redux/menu/product/type";
import { useAppDispatch } from "../../../redux/hook";
type Props = {
  onSuccess: () => void;
};
export default function AddNewProduct({ onSuccess }: Props) {
  const dispatch = useAppDispatch();
  const inputs: InputProps[] = [
    {
      label: "Name",
      type: "text",
      name: "name",
    },
    {
      label: "Select category",
      type: "text",
      name: "category",
    },
    {
      label: "Price",
      type: "number",
      name: "price",
    },
    {
      label: "Caption",
      type: "text",
      name: "caption",
    },
    {
      label: "Stock",
      type: "number",
      className: "col-span-1",
      name: "stock",
    },
    {
      label: "Sizes",
      type: "text",
      className: "col-span-1",
      name: "size",
    },
  ];
  const getFormControl = (
    form: HTMLFormElement,
    name: string
  ): string | number => {
    const control = form.elements.namedItem(name);
    if (!control || control instanceof RadioNodeList || !("value" in control)) {
      throw new Error(
        `Form control "${name}" not found or was a RadioNodeList`
      );
    }
    return control.value as string | number;
  };
  return (
    <div className="mx-auto w-1/2 flex flex-col gap-[3vh]">
      <form
        onSubmit={(element: React.FormEvent<HTMLFormElement>) => {
          element.preventDefault();
          const res: Product = {
            name: getFormControl(element.currentTarget, "name").toString(),
            price: Number(getFormControl(element.currentTarget, "price")),
            category: Number(getFormControl(element.currentTarget, "category")),
            image: "",
          };
          dispatch(addProduct(res)).then((res) => {
            if (res) {
              onSuccess();
            }
          });
        }}
      >
        <h2 className="mb-2 text-xl">Add new Products</h2>
        <div className="grid grid-cols-2 gap-6">
          {inputs.map((el) => (
            <Input
              className="col-span-2"
              name={el.name}
              type={el.type}
              variant={"bordered"}
              label={el.label}
              {...el}
            />
          ))}
        </div>
        <div className="gap-[2vh] w-full flex justify-end">
          <CSButton text="Save as draft" />
          <CSButton type="submit" color="primary" text="Publish" />
        </div>
      </form>
    </div>
  );
}
