export function StickyCta({
  label,
  disabled,
  hint,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  hint?: string;
  onClick?: () => void;
}) {
  return (
    <div className="sticky bottom-0 border-t border-border bg-surface px-4 py-3 shadow-[0_-1px_4px_rgba(0,0,0,0.08)] md:static md:col-start-1 md:bg-transparent md:p-0 md:shadow-none">
      <div className="mx-auto max-w-[480px] md:max-w-none">
        {disabled && hint && (
          <p className="mb-2 text-center text-[12px] text-text-secondary">{hint}</p>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={`h-12 w-full rounded-md text-[15px] font-bold transition-colors ${
            disabled
              ? "cursor-not-allowed bg-border text-text-secondary"
              : "bg-primary-green text-white hover:bg-deep-green"
          }`}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
