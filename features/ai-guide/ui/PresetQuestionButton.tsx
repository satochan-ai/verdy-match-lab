export function PresetQuestionButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 rounded-md border px-3 text-[13px] font-bold transition-colors ${
        active
          ? "border-primary-green text-primary-green"
          : "border-border text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}
