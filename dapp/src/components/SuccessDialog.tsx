import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface SuccessDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  message: string;
}

function SuccessDialog({
  isOpen,
  setIsOpen,
  title,
  message,
}: SuccessDialogProps) {
  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>{message}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default SuccessDialog;
