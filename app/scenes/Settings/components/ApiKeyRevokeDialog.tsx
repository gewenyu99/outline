import { useTranslation } from "react-i18next";
import type ApiKey from "~/models/ApiKey";
import ConfirmationDialog from "~/components/ConfirmationDialog";
import posthog from "~/utils/posthog";

type Props = {
  apiKey: ApiKey;
  onSubmit: () => void;
};

export default function ApiKeyRevokeDialog({ apiKey, onSubmit }: Props) {
  const { t } = useTranslation();

  const handleSubmit = async () => {
    await apiKey.delete();
    posthog.capture("api_key_revoked");
    onSubmit();
  };

  return (
    <ConfirmationDialog
      onSubmit={handleSubmit}
      submitText={t("Revoke")}
      savingText={`${t("Revoking")}…`}
      danger
    >
      {t("Are you sure you want to revoke the {{ tokenName }} token?", {
        tokenName: apiKey.name,
      })}
    </ConfirmationDialog>
  );
}
