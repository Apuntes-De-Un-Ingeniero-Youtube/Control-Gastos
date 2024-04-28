import React from "react";
import { message, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderApp from "./HeaderApp";
import FooterApp from "./FooterApp";
import TableApp from "./TableApp";
import CreateModal from "./CreateModal";
import DeleteModal from "./DeleteModal";
import { dataApp, generateColumns, initialData } from "../utils/utils.util";

const ControlGastos = () => {
  const [keyToDelete, setKeyToDelete] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [editingRecord, setEditingRecord] = React.useState(initialData);
  const [newExpense, setNewExpense] = React.useState(initialData);
  const [data, setData] = React.useState(dataApp);

  const handleDelete = (key) => {
    setKeyToDelete(key);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setData(data.filter((item) => item.key !== keyToDelete));
    setDeleteModalVisible(false);
    setKeyToDelete(null);
    message.success("El registro se ha eliminado con éxito");
  };

  const handleAdd = () => {
    setData([...data, { ...newExpense, key: (data.length + 1).toString() }]);
    setModalVisible(false);
    setNewExpense(initialData);
    message.success("El registro se ha agregado con éxito");
  };

  const handleUpdate = (key) => {
    setEditingRecord(data.find((item) => item.key === key));
    setModalVisible(true);
  };

  const confirmUpdateRecord = () => {
    setData(
      data.map((item) => {
        if (item.key === editingRecord.key) {
          return editingRecord;
        }
        return item;
      })
    );
    setModalVisible(false);
    setEditingRecord(null);
    message.success("El registro se ha actualizado con éxito");
  };

  return (
    <Layout>
      <HeaderApp {...{ setModalVisible }} />
      <Layout>
        <Content>
          <br />
          <br />
          <TableApp
            columns={generateColumns(handleUpdate, handleDelete)}
            data={data}
          />
          <CreateModal
            {...{
              modalVisible,
              setModalVisible,
              handleAdd,
              newExpense,
              setNewExpense,
              editingRecord,
              setEditingRecord,
              confirmUpdateRecord,
            }}
          />
          <DeleteModal
            {...{
              deleteModalVisible,
              setDeleteModalVisible,
              newExpense,
              confirmDelete,
            }}
          />
        </Content>
      </Layout>
      <FooterApp />
    </Layout>
  );
};

export default ControlGastos;
