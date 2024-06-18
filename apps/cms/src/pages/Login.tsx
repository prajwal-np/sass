import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import Container from "../components/Container";
import { useAppDispatch } from "../redux/hook";
import { signIn } from "../redux/auth/auth.action";

export default function Login() {
  const dispatch = useAppDispatch();
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
    <Container>
      <div className="flex justify-center items-center h-full w-full">
        <Card className="w-[40%] h-[70%]">
          <CardHeader className=" flex-col flex items-start"></CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <form
              className=" flex flex-col justify-center h-full items-center gap-4"
              onSubmit={(element: React.FormEvent<HTMLFormElement>) => {
                element.preventDefault();
                const res = {
                  email: getFormControl(
                    element.currentTarget,
                    "email"
                  ).toString(),
                  password: getFormControl(
                    element.currentTarget,
                    "password"
                  ).toString(),
                };
                dispatch(signIn(res));
              }}
            >
              <div className="flex flex-col justify-center items-start w-[80%]">
                <h1 className="text-5xl font-semibold leading-none text-default-600">
                  Login
                </h1>
                <p className="text-default-400">
                  Please enter your email and password
                </p>
              </div>
              <div className="flex gap-6 flex-col w-[80%]">
                <Input
                  name="email"
                  type="email"
                  variant={"bordered"}
                  label="Email"
                />
                <Input
                  name="password"
                  type="password"
                  variant={"bordered"}
                  label="Password"
                />
              </div>
              <div className="flex justify-end w-[80%]">
                <Button
                  className="w-[50%]"
                  color="primary"
                  type="submit"
                  size="lg"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-3">
              <p className="font-semibold text-default-400 text-small">
                @copyright 2024
              </p>
              <p className=" text-default-400 text-small">CCL product</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}
