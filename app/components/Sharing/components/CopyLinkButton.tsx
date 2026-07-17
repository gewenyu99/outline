import { LinkIcon } from "outline-icons";
import { useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import CopyToClipboard from "~/components/CopyToClipboard";
import NudeButton from "~/components/NudeButton";
import Tooltip from "~/components/Tooltip";
import posthog from "~/utils/posthog";

export function CopyLinkButton({
  url,
  onCopy,
}: {
  url: string;
  onCopy: () => void;
}) {
  const { t } = useTranslation();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const handleCopied = useCallback(() => {
    posthog.capture("document_share_link_copied");
    onCopy();

    timeout.current = setTimeout(() => {
      toast.message(t("Link copied to clipboard"));
    }, 100);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [onCopy, t]);

  return (
    <Tooltip content={t("Copy link")} placement="top">
      <CopyToClipboard text={url} onCopy={handleCopied}>
        <NudeButton type="button">
          <LinkIcon size={20} />
        </NudeButton>
      </CopyToClipboard>
    </Tooltip>
  );
}
