import { Input, InputProps } from "@nextui-org/react";
import CSButton from "../../../@ui/CSButton";
import { useAppDispatch } from "../../../redux/hook";
import { addDevice } from "../../../redux/devices/device.action";
type Props = {
  onSuccess: () => void;
};
export default function AddNewDevice({ onSuccess }: Props) {
  const dispatch = useAppDispatch();
  const inputs: InputProps[] = [
    {
      label: "Pairing code",
      type: "number",
      name: "pairingCode",
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

          dispatch(
            addDevice({
              paringCode: Number(
                getFormControl(element.currentTarget, "pairingCode")
              ),
            })
          ).then((res) => {
            if (res) {
              onSuccess();
            }
          });
        }}
      >
        <h2 className="mb-2 text-xl">Add new device</h2>
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
