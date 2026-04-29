import CreateCabinForm from "../cabins/CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open id="create">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window id="create">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const close = () => setIsOpenModal(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((s) => !s)}>Add new Cabin</Button>
//       {isOpenModal && (
//         <Modal close={close}>
//           <CreateCabinForm close={close} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
