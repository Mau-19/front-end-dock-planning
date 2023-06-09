import { Dispatch, SetStateAction } from "react";

import { useQuery } from "@tanstack/react-query";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { getWarehouses } from "../../api/apiWarehouses";

import { Warehouse } from "../../types/Warehouse";

interface Month {
  monthName: string;
  monthValue: number;
}

interface Props {
  setSelectedWarehouse: Dispatch<SetStateAction<Warehouse>>;
  selectedWarehouse: Warehouse;
}

export const WarehouseDropdown: React.FC<Props> = ({
  setSelectedWarehouse,
  selectedWarehouse,
}) => {
  const { data: warehouses } = useQuery(["warehouses"], getWarehouses);
  const handleSetWarehouse = (e: number) => {
    const warehouseIdToNumber: number = +e;
    const foundWarehouse = warehouses.find(
      (warehouse) => warehouse.id === warehouseIdToNumber
    );
    setSelectedWarehouse(foundWarehouse);
  };

  return (
    <>
      <Dropdown
        as={ButtonGroup}
        onSelect={handleSetWarehouse}
        style={{ margin: "0px 10px" }}
      >
        <Button variant="dark">{selectedWarehouse?.description}</Button>
        <Dropdown.Toggle split variant="dark" />
        <Dropdown.Menu>
          {warehouses?.map((warehouse, index) => (
            <Dropdown.Item key={index} eventKey={warehouse.id}>
              {warehouse?.description}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
