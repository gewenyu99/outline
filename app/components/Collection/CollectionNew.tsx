import { runInAction } from "mobx";
import { observer } from "mobx-react";
import posthog from "posthog-js";
import { useCallback } from "react";
import { toast } from "sonner";
import { errToString } from "@shared/utils/error";
import useStores from "~/hooks/useStores";
import history from "~/utils/history";
import type { FormData } from "./CollectionForm";
import { CollectionForm } from "./CollectionForm";

type Props = {
  onSubmit: () => void;
};

export const CollectionNew = observer(function CollectionNew_({
  onSubmit,
}: Props) {
  const { collections } = useStores();
  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        const collection = await collections.save(data);
        // Avoid flash of loading state for the new collection, we know it's empty.
        runInAction(() => {
          collection.documents = [];
        });
        posthog.capture("collection_created", {
          collection_id: collection.id,
          permission: collection.permission ?? "private",
        });
        onSubmit?.();
        history.push(collection.path);
      } catch (error) {
        toast.error(errToString(error));
      }
    },
    [collections, onSubmit]
  );

  return <CollectionForm handleSubmit={handleSubmit} />;
});
