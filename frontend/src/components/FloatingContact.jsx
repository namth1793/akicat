const PHONE = '0901234567';
const PHONE_DISPLAY = '0901 234 567';

function RippleIcon({ href, target, rel, ariaLabel, color, children, tooltip }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className="group relative flex items-center justify-center w-13 h-13"
    >
      {/* Ripple rings — cùng timing cho cả 2 icon */}
      <span className={`absolute inset-0 rounded-full ${color}/30 animate-ping`} />
      <span className={`absolute inset-[-6px] rounded-full ${color}/15 animate-ping [animation-delay:0.5s]`} />

      <div className="relative w-13 h-13 rounded-full ring-2 ring-white shadow-lg overflow-hidden">
        {children}
      </div>

      <span className="absolute right-full mr-3 whitespace-nowrap bg-stone-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        {tooltip}
      </span>
    </a>
  );
}

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3">
      <RippleIcon
        href={`https://zalo.me/${PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        ariaLabel="Chat Zalo"
        color="bg-blue-400"
        tooltip="Chat Zalo"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
          alt="Zalo"
          className="w-full h-full object-cover"
        />
      </RippleIcon>

      <RippleIcon
        href={`tel:${PHONE}`}
        ariaLabel={`Gọi ${PHONE_DISPLAY}`}
        color="bg-emerald-400"
        tooltip={PHONE_DISPLAY}
      >
        <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z"/>
          </svg>
        </div>
      </RippleIcon>
    </div>
  );
}
