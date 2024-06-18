import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
  Input,
  Dropdown,
  Button,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BackIcon, EditIcon, TrashIcon } from "../icons";
const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];
const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
type User = (typeof users)[0];
type Props<T> = {
  addNewView?: JSX.Element;
  header?: {
    name: string;
    uid: string;
  }[];
  rows?: any;
  action?: {
    edit: (_id: number) => void;
    delete: (_id: number) => void;
  };
  view?: "table" | "addNew";
  setView?: React.Dispatch<React.SetStateAction<"table" | "addNew">>;
};
export default function TableComponent<T>({
  addNewView,
  header,
  rows,
  action,
  view,
  setView,
}: Props<T>) {
  const [page, setPage] = React.useState(1);
  const [currentView, setCurrentView] = useState<"table" | "addNew">();
  useEffect(() => {
    console.log(view);
    setCurrentView(view || "table");
  }, [view]);
  const pages = useMemo(() => {
    return 10;
  }, []);
  const renderCell = React.useCallback(
    (user: User, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof User];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {user.team}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[
                  user.status as "active" | "paused" | "vacation"
                ] as any
              }
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-4">
              <Tooltip content="Edit">
                <EditIcon
                  onClick={() => {
                    action?.edit(user.id);
                  }}
                  className="w-6 text-default-400 cursor-pointer active:opacity-50"
                />
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <TrashIcon
                  onClick={() => action?.delete(user.id)}
                  className="w-6 text-danger cursor-pointer "
                />
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [action]
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={"Search"}
            variant="bordered"
            onClear={() => {}}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={"down"} size="sm" variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={"all"}
                selectionMode="multiple"
                onSelectionChange={() => {}}
              >
                {[{ name: "Active", uid: "1" }].map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {addNewView ? (
              <Button
                className="bg-foreground text-background"
                endContent={"+"}
                size="sm"
                onClick={() => {
                  setView && setView("addNew");
                  setCurrentView("addNew");
                }}
              >
                Add New
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={() => {}}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [addNewView, setView]);

  const tableView = useMemo(
    () => (
      <Table
        aria-label="Example table with custom cells"
        topContentPlacement="outside"
        topContent={topContent}
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        onSortChange={(descriptor) => {
          console.log(descriptor);
        }}
      >
        <TableHeader columns={header}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows.map((el: any) => ({ ...el, action: el.id }))}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    ),
    [rows, header]
  );
  const currentViewRender = useMemo(() => {
    console.log(currentView);
    if (currentView === "table") return tableView;
    else if (currentView === "addNew")
      return (
        <div className="w-full">
          <Button
            className="bg-foreground text-background"
            endContent={"+"}
            size="sm"
            onClick={() => {
              setView && setView("table");
              setCurrentView("table");
            }}
          >
            <BackIcon
              className="text-default w-[2.5vh]"
              onClick={() => {
                setView && setView("table");
                setCurrentView("table");
              }}
            />
            <p className="text-md">Back</p>
          </Button>
          <div className="w-full">{addNewView}</div>
        </div>
      );
    return <></>;
  }, [addNewView, currentView, setView, tableView]);

  return <>{currentViewRender}</>;
}
