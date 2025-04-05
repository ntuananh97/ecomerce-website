import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ButtonLoading from "@/components/LoadingButton";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  title = "Delete Item",
  description,
  isLoading = false,
}: DeleteConfirmationProps) => {
  const { t } = useTranslation();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description ||
              t('common.deleteConfirmation', { itemName: itemName ? `"${itemName}"` : t('common.thisItem') })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <ButtonLoading
            variant="destructive"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {t('common.delete')}
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmation;
