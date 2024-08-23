import { Input } from "@nextui-org/react";
import Container from "../../../components/Container";
import CSButton from "../../../@ui/CSButton";
import { useAppDispatch } from "../../../redux/hook";
import { useEffect, useState } from "react";
import { addCategory } from "../../../redux/menu/category/category.action";
type Props = {
  onSuccess: () => void;
};
export default function AddNewCategory({ onSuccess }: Props) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  useEffect(() => {}, []);
  return (
    <div className="mx-auto w-1/2 flex flex-col gap-[3vh]">
      <div>
        <h2 className="mb-2 text-xl">Add new category</h2>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          name="category"
          type="text"
          variant={"bordered"}
          label="Category name"
        />
      </div>
      <div className="gap-[2vh] w-full flex justify-end">
        <CSButton text="Save as draft" />
        <CSButton
          type="button"
          color="primary"
          text="Publish"
          disabled={!name.length}
          onClick={() => {
            dispatch(addCategory({ name })).then((action) => {
              if (action.payload) {
                onSuccess();
              }
            });
          }}
        />
      </div>
    </div>
  );
}
