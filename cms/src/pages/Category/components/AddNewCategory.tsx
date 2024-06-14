import { Input } from "@nextui-org/react";
import Container from "../../../components/Container";
import CSButton from "../../../@ui/CSButton";

export default function AddNewCategory() {
  return (
    <div className="mx-auto w-1/2 flex flex-col gap-[3vh]">
      <div>
        <h2 className="mb-2 text-xl">Add new category</h2>
        <Input
          name="category"
          type="text"
          variant={"bordered"}
          label="Category name"
        />
      </div>
      <div className="gap-[2vh] w-full flex justify-end">
        <CSButton text="Save as draft" />
        <CSButton type="button" color="primary" text="Publish" />
      </div>
    </div>
  );
}
