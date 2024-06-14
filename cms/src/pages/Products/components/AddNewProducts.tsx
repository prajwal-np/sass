import { Input, InputProps } from "@nextui-org/react";
import Container from "../../../components/Container";
import CSButton from "../../../@ui/CSButton";

export default function AddNewProduct() {
  const inputs: InputProps[] = [
    {
      label: "Name",
      type: "text",
      name: "productName",
    },
    {
      label: "Select category",
      type: "text",
      name: "productCategory",
    },
    {
      label: "Price",
      type: "number",
      name: "productPrice",
    },
    {
      label: "Caption",
      type: "text",
      name: "productCaption",
    },
    {
      label: "Stock",
      type: "number",
      className: "col-span-1",
      name: "productStock",
    },
    {
      label: "Sizes",
      type: "text",
      className: "col-span-1",
      name: "productSizes",
    },
  ];
  return (
    <div className="mx-auto w-1/2 flex flex-col gap-[3vh]">
      <div>
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
      </div>
      <div className="gap-[2vh] w-full flex justify-end">
        <CSButton text="Save as draft" />
        <CSButton type="button" color="primary" text="Publish" />
      </div>
    </div>
  );
}
