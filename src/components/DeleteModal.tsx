import ActionButton from "./ActionButton";
import DynamicIcon from "./DynamicIcon";

const DeleteModal = ({
  deleteFunction,
  cancelFunction,
}: {
  deleteFunction: () => void;
  cancelFunction: () => void;
}) => {
  return (
    <dialog id="deleteModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg flex items-center gap-3">
          <span className="text-error">
            <DynamicIcon name="alert-triangle" />
          </span>
          Atenção
        </h3>
        <p className="py-4">Esta ação não pode ser desfeita!</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-3">
            <ActionButton
              text="Excluir"
              icon={<DynamicIcon name="alert-triangle" />}
              color="error"
              type="submit"
              action={() => deleteFunction()}
            />
            <ActionButton
              text="Cancelar"
              icon={<DynamicIcon name="x" />}
              type="submit"
              action={() => cancelFunction()}
            />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
